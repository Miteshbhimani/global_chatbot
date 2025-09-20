// src/ai/flows/website-content-summarization.ts
'use server';

/**
 * @fileOverview Summarizes content from a given website URL based on user queries.
 *
 * - summarizeWebsiteContent - A function that takes a website URL and a query, then returns a summary of the website content related to the query.
 * - SummarizeWebsiteContentInput - The input type for the summarizeWebsiteContent function.
 * - SummarizeWebsiteContentOutput - The return type for the summarizeWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { JSDOM } from 'jsdom';

const SummarizeWebsiteContentInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to summarize.'),
  query: z.string().describe('The query to use when summarizing the website content.'),
});
export type SummarizeWebsiteContentInput = z.infer<typeof SummarizeWebsiteContentInputSchema>;

const SummarizeWebsiteContentOutputSchema = z.object({
  summary: z.string().describe('A summary of the website content related to the query.'),
});
export type SummarizeWebsiteContentOutput = z.infer<typeof SummarizeWebsiteContentOutputSchema>;

async function extractTextFromWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const textContent = document.body ? document.body.textContent || '' : '';
    return textContent.trim();
  } catch (error) {
    console.error('Error fetching or parsing website:', error);
    return 'Error: Could not fetch or parse website content.';
  }
}

export async function summarizeWebsiteContent(input: SummarizeWebsiteContentInput): Promise<SummarizeWebsiteContentOutput> {
  return summarizeWebsiteContentFlow(input);
}

const summarizeWebsiteContentPrompt = ai.definePrompt({
  name: 'summarizeWebsiteContentPrompt',
  input: {schema: SummarizeWebsiteContentInputSchema},
  output: {schema: SummarizeWebsiteContentOutputSchema},
  prompt: `You are an expert web content summarizer. Your goal is to provide a concise and informative summary of a website's content based on a user's query.

  Website URL: {{{url}}}
  User Query: {{{query}}}

  Website Content:
  {{#if websiteContent}}
  {{{websiteContent}}}
  {{else}}
  The content of the website could not be fetched.
  {{/if}}

  Summary:`,
});

const summarizeWebsiteContentFlow = ai.defineFlow(
  {
    name: 'summarizeWebsiteContentFlow',
    inputSchema: SummarizeWebsiteContentInputSchema,
    outputSchema: SummarizeWebsiteContentOutputSchema,
  },
  async input => {
    const websiteContent = await extractTextFromWebsite(input.url);
    const {output} = await summarizeWebsiteContentPrompt({
      ...input,
      websiteContent,
    });
    return output!;
  }
);
