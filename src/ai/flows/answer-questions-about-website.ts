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

export async function answerQuestionsAboutWebsite(input: AnswerQuestionsAboutWebsiteInput): Promise<AnswerQuestionsAboutWebsiteOutput> {
  return answerQuestionsAboutWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutWebsitePrompt',
  input: {schema: AnswerQuestionsAboutWebsiteInputSchema},
  output: {schema: AnswerQuestionsAboutWebsiteOutputSchema},
  prompt: `You are a helpful chat agent answering questions about the content of a website.

  The website URL is: {{{websiteUrl}}}

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
    const {output} = await prompt(input);
    return output!;
  }
);
