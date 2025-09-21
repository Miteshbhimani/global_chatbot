
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

const AnswerQuestionsAboutWebsiteInputSchema = z.object({
  websiteUrl: z.string().describe('The URL of the website to answer questions about.'),
  question: z.string().describe('The question to answer about the website.'),
  chatHistory: z.string().optional().describe('The chat history of the conversation.'),
});
export type AnswerQuestionsAboutWebsiteInput = z.infer<typeof AnswerQuestionsAboutWebsiteInputSchema>;

const AnswerQuestionsAboutWebsiteOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the website.'),
});
export type AnswerQuestionsAboutWebsiteOutput = z.infer<typeof AnswerQuestionsAboutWebsiteOutputSchema>;

// List of domains that are known to block scraping attempts.
const BLOCKED_DOMAINS = [
  'flipkart.com',
  'amazon.com',
  'walmart.com',
  'bestbuy.com',
  'target.com',
];

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

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutWebsitePrompt',
  input: {
    schema: z.object({
      ...AnswerQuestionsAboutWebsiteInputSchema.shape,
      websiteContent: z.string().describe('The text content of the website. This may be an error message or empty if the site is blocked.'),
    }),
  },
  output: {schema: AnswerQuestionsAboutWebsiteOutputSchema},
  prompt: `You are a helpful chat agent. Your goal is to answer questions based on the provided website content or, if blocked, act as a smart search assistant.

The website URL is: {{{websiteUrl}}}

Here is the content of the website:
{{{websiteContent}}}

Follow these rules:

1.  **If Website Content is Available:** If the \`websiteContent\` is not an error, use it as the primary source to answer the user's question.

2.  **If Website is Blocked or Content is an Error:**
    *   First, acknowledge that you couldn't access the live page content from the URL.
    *   Next, transform the user's question into a search query.
    *   Then, generate a direct search link for the given website. For example, if the user asks for "product details" on "www.flipkart.com", create a search URL like "https://www.flipkart.com/search?q=product+details".
    *   Present this search link to the user.
    *   Finally, AFTER providing the link, try to answer the user's question using your own general knowledge. Ensure there is a newline between the search link and your general knowledge answer to improve readability.

3.  **Chat History Context:** Use the following chat history to maintain context within the session.
    {{#if chatHistory}}
    {{{chatHistory}}}
    {{else}}
    There is no chat history.
    {{/if}}

Now, answer the following question:
"{{{question}}}"`,
});

const answerQuestionsAboutWebsiteFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutWebsiteFlow',
    inputSchema: AnswerQuestionsAboutWebsiteInputSchema,
    outputSchema: AnswerQuestionsAboutWebsiteOutputSchema,
  },
  async input => {
    let websiteContent = '';
    const url = new URL(input.websiteUrl);
    const domain = url.hostname.replace(/^www\./, '');

    // If the domain is in our blocked list, don't even try to fetch it.
    if (BLOCKED_DOMAINS.includes(domain)) {
        websiteContent = `Error: The website ${url.hostname} is known to block automated access.`;
    } else {
        websiteContent = await extractTextFromWebsite(input.websiteUrl);
    }
    
    const llmResponse = await prompt({
      ...input,
      websiteContent,
    });
    
    return llmResponse.output ?? { answer: "I apologize, but I encountered an unexpected error and cannot provide a response at this time." };
  }
);
