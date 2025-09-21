'use server';

import { answerQuestionsAboutWebsite } from '@/ai/flows/answer-questions-about-website';
import { summarizeWebsite } from '@/ai/flows/summarize-website';
import type { Message } from '@/lib/types';

export async function getAgentResponse(
  url: string,
  question: string,
  chatHistory: Message[]
): Promise<string> {
  try {
    // The chatHistory already includes the latest user message.
    // The 'question' parameter is the content of that latest message.
    const historyString = chatHistory
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Agent'}: ${msg.content}`)
      .join('\n');

    const response = await answerQuestionsAboutWebsite({
      websiteUrl: url,
      question: question,
      chatHistory: historyString,
    });

    if (!response || !response.answer) {
      return 'I apologize, but I was unable to get a response. Please try again.';
    }

    return response.answer;
  } catch (error) {
    console.error('Error getting agent response:', error);
    return 'An error occurred while communicating with the agent. Please check the console for more details.';
  }
}

export async function getSummary(url: string): Promise<string> {
  try {
    const response = await summarizeWebsite({ websiteUrl: url });

    if (!response || !response.summary) {
      return 'I apologize, but I was unable to generate a summary. Please try again.';
    }

    return response.summary;
  } catch (error) {
    console.error('Error getting summary:', error);
    return 'An error occurred while generating the summary. Please check the console for more details.';
  }
}
