'use server';

/**
 * @fileOverview Generates music suggestions based on recently watched videos.
 *
 * - suggestUpNextMusic - A function that suggests 'Up Next' music for the user.
 * - SuggestUpNextMusicInput - The input type for the suggestUpNextMusic function.
 * - SuggestUpNextMusicOutput - The return type for the suggestUpNextMusic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUpNextMusicInputSchema = z.object({
  recentlyWatchedVideos: z
    .array(z.string())
    .describe('A list of recently watched video titles or descriptions.'),
});
export type SuggestUpNextMusicInput = z.infer<typeof SuggestUpNextMusicInputSchema>;

const SuggestUpNextMusicOutputSchema = z.object({
  suggestedTracks: z
    .array(z.string())
    .describe('A list of suggested music tracks based on watched videos.'),
});
export type SuggestUpNextMusicOutput = z.infer<typeof SuggestUpNextMusicOutputSchema>;

export async function suggestUpNextMusic(
  input: SuggestUpNextMusicInput
): Promise<SuggestUpNextMusicOutput> {
  return suggestUpNextMusicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUpNextMusicPrompt',
  input: {schema: SuggestUpNextMusicInputSchema},
  output: {schema: SuggestUpNextMusicOutputSchema},
  prompt: `You are a music expert. Based on the user's recently watched videos, suggest music tracks that would seamlessly transition and enhance their rave experience.

Recently Watched Videos: {{#each recentlyWatchedVideos}}{{{this}}}\n{{/each}}

Suggest tracks suitable for seamless, dynamic transitions, enhancing the rave experience.`,
});

const suggestUpNextMusicFlow = ai.defineFlow(
  {
    name: 'suggestUpNextMusicFlow',
    inputSchema: SuggestUpNextMusicInputSchema,
    outputSchema: SuggestUpNextMusicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
