
import './dotenv';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: ""})], // API Key removed as requested.
  model: 'googleai/gemini-2.0-flash',
});
