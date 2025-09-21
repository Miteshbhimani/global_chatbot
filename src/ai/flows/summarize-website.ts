'use server';

/**
 * @fileOverview A flow that summarizes a given website.
 *
 * - summarizeWebsite - A function that summarizes a website.
 * - SummarizeWebsiteInput - The input type for the summarizeWebsite function.
 * - SummarizeWebsiteOutput - The return type for the summarizeWebsite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { JSDOM } from 'jsdom';

const SummarizeWebsiteInputSchema = z.object({
  websiteUrl: z.string().describe('The URL of the website to summarize.'),
});
export type SummarizeWebsiteInput = z.infer<typeof SummarizeWebsiteInputSchema>;

const SummarizeWebsiteOutputSchema = z.object({
  summary: z.string().describe('The summary of the website.'),
});
export type SummarizeWebsiteOutput = z.infer<typeof SummarizeWebsiteOutputSchema>;

async function extractTextFromWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return `Error: Failed to fetch website content. Status: ${response.status}`;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    document.querySelectorAll('script, style, nav, footer, aside').forEach((el) => el.remove());
    const textContent = document.body ? document.body.textContent || '' : '';
    return textContent.replace(/\s\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error fetching or parsing website:', error);
    return 'Error: Could not fetch or parse website content. The site may be blocking automated access.';
  }
}

export async function summarizeWebsite(input: SummarizeWebsiteInput): Promise<SummarizeWebsiteOutput> {
  return summarizeWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWebsitePrompt',
  input: {schema: z.object({
    ...SummarizeWebsiteInputSchema.shape,
    websiteContent: z.string().describe('The text content of the website.'),
  })},
  output: {schema: SummarizeWebsiteOutputSchema},
  prompt: `You are an expert summarizer. Your goal is to provide a concise summary of the provided website content.

The website URL is: {{{websiteUrl}}}

Here is the content of the website:
{{{websiteContent}}}

If the website content starts with "Error:", it means you were unable to access the website's content. In this situation, you MUST inform the user that you couldn't access the site to generate a summary.

Please provide a summary of the website.`,
});

const summarizeWebsiteFlow = ai.defineFlow(
  {
    name: 'summarizeWebsiteFlow',
    inputSchema: SummarizeWebsiteInputSchema,
    outputSchema: SummarizeWebsiteOutputSchema,
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
