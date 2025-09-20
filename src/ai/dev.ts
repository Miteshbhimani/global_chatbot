import { config } from 'dotenv';
config();

import '@/ai/flows/website-content-summarization.ts';
import '@/ai/flows/answer-questions-about-website.ts';
import '@/ai/flows/chat-history-context.ts';