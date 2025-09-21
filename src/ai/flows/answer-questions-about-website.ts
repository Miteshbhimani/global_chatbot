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
import { JSDOM } from 'jsdom';

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

// Extracted from website-content-summarization.ts and adapted for this flow
async function extractTextFromWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    // Remove script and style elements to avoid including irrelevant code in the prompt
    document.querySelectorAll('script, style').forEach((el) => el.remove());
    const textContent = document.body ? document.body.textContent || '' : '';
    // Condense whitespace
    return textContent.replace(/\s\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error fetching or parsing website:', error);
    return 'Error: Could not fetch or parse website content.';
  }
}

export async function answerQuestionsAboutWebsite(input: AnswerQuestionsAboutWebsiteInput): Promise<AnswerQuestionsAboutWebsiteOutput> {
  return answerQuestionsAboutWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutWebsitePrompt',
  input: {schema: z.object({
    ...AnswerQuestionsAboutWebsiteInputSchema.shape,
    websiteContent: z.string().describe('The text content of the website.'),
  })},
  output: {schema: AnswerQuestionsAboutWebsiteOutputSchema},
  prompt: `You are a helpful chat agent answering questions about the content of a website.

  The website URL is: {{{websiteUrl}}}

  Here is the content of the website:
  {{{websiteContent}}}

  Use the following chat history to maintain context within the session:
  {{#if chatHistory}}
  {{{chatHistory}}}
  {{else}}
  There is no chat history.
  {{/if}}

  Now, answer the following question based on the website content:
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

    const {output} = await prompt({
      ...input,
      websiteContent,
    });
    return output!;
  }
);
