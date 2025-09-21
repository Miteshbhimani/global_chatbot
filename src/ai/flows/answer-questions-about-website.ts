
'use server';

/**
 * @fileOverview A flow that answers questions about a given website.
 *
 * - answerQuestionsAboutWebsite - A function that answers questions about a website.
 * - AnswerQuestionsAboutWebsiteInput - The input type for the answerQuestionsAboutWebsite function.
 * - AnswerQuestionsAboutWebsiteOutput - The return type for the answerQuestionsAboutWebsite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {JSDOM} from 'jsdom';
import {generateImage} from './generate-image';

const AnswerQuestionsAboutWebsiteInputSchema = z.object({
  websiteUrl: z.string().describe('The URL of the website to answer questions about.'),
  question: z.string().describe('The question to answer about the website.'),
  chatHistory: z.string().optional().describe('The chat history of the conversation.'),
});
export type AnswerQuestionsAboutWebsiteInput = z.infer<typeof AnswerQuestionsAboutWebsiteInputSchema>;

const AnswerQuestionsAboutWebsiteOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the website.'),
  imageUrl: z.string().optional().describe('An image URL relevant to the answer, if requested.'),
});
export type AnswerQuestionsAboutWebsiteOutput = z.infer<typeof AnswerQuestionsAboutWebsiteOutputSchema>;

// Extracted from website-content-summarization.ts and adapted for this flow
async function extractTextFromWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return `Error: Failed to fetch website content. Status: ${response.status}`;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // Remove script and style elements to avoid including irrelevant code in the prompt
    document.querySelectorAll('script, style, nav, footer, aside').forEach(el => el.remove());
    const textContent = document.body ? document.body.textContent || '' : '';
    // Condense whitespace
    return textContent.replace(/\s\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error fetching or parsing website:', error);
    return 'Error: Could not fetch or parse website content. The site may be blocking automated access.';
  }
}

export async function answerQuestionsAboutWebsite(
  input: AnswerQuestionsAboutWebsiteInput
): Promise<AnswerQuestionsAboutWebsiteOutput> {
  return answerQuestionsAboutWebsiteFlow(input);
}

const generateImageTool = ai.defineTool(
  {
    name: 'generateImage',
    description: 'Generates an image based on a text description.',
    inputSchema: z.object({
      prompt: z.string().describe('A detailed text description of the image to generate.'),
    }),
    outputSchema: z.object({
      imageUrl: z.string(),
    }),
  },
  async input => {
    const {imageUrl} = await generateImage({prompt: input.prompt});
    return {imageUrl};
  }
);

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutWebsitePrompt',
  tools: [generateImageTool],
  input: {
    schema: z.object({
      ...AnswerQuestionsAboutWebsiteInputSchema.shape,
      websiteContent: z.string().describe('The text content of the website.'),
    }),
  },
  output: {schema: AnswerQuestionsAboutWebsiteOutputSchema},
  prompt: `You are a helpful chat agent. Your primary goal is to answer questions based on the content of a website.

The website URL is: {{{websiteUrl}}}

Here is the content of the website:
{{{websiteContent}}}

First, try to answer the question using the provided website content.

If the website content starts with "Error:", it means you were unable to access the website's content. This might be because the site has security measures that block automated access. In this situation, you MUST inform the user that you couldn't access the site, but then you MUST try to answer their question using your own general knowledge. For example, if they ask for product specifications, provide them from your knowledge base. Do not make up an excuse like "the site is overloaded". Be direct about the failure but still try to be helpful.

If the user's question asks for an image, a picture, or to be shown something, you MUST use the generateImage tool to generate an image. Provide a text answer that complements the image.

Use the following chat history to maintain context within the session:
{{#if chatHistory}}
{{{chatHistory}}}
{{else}}
There is no chat history.
{{/if}}

Now, answer the following question:
{{{question}}}`,
});

const answerQuestionsAboutWebsiteFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutWebsiteFlow',
    inputSchema: AnswerQuestionsAboutWebsiteInputSchema,
    outputSchema: AnswerQuestionsAboutWebsiteOutputSchema,
  },
  async input => {
    const websiteContent = await extractTextFromWebsite(input.websiteUrl);

    let llmResponse = await prompt({
      ...input,
      websiteContent,
    });

    while (llmResponse.isPending()) {
      const toolRequest = llmResponse.toolRequest();
      if (toolRequest) {
        const toolResponse = await toolRequest.run();
        llmResponse = await toolRequest.next(toolResponse);
      } else {
        // If the model is pending but there is no tool request, break the loop.
        break;
      }
    }
    
    return llmResponse.output() ?? { answer: "No response from AI." };
  }
);
