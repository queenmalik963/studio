
'use server';

/**
 * @fileOverview Searches YouTube for videos based on a query.
 *
 * - searchYoutubeVideos - A function that searches YouTube.
 * - YoutubeSearchInput - The input type for the searchYoutubeVideos function.
 * - YoutubeSearchOutput - The return type for the searchYoutubeVideos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const YoutubeSearchInputSchema = z.object({
  query: z.string().describe('The search term to look for on YouTube.'),
});
export type YoutubeSearchInput = z.infer<typeof YoutubeSearchInputSchema>;

export const YoutubeSearchResultSchema = z.object({
  id: z.string().describe('The YouTube video ID.'),
  title: z.string().describe('The title of the video.'),
  thumbnail: z.string().describe('URL of the video thumbnail.'),
  channelTitle: z.string().describe('The name of the YouTube channel.'),
});
export type YoutubeSearchResult = z.infer<typeof YoutubeSearchResultSchema>;

export const YoutubeSearchOutputSchema = z.object({
  videos: z.array(YoutubeSearchResultSchema).describe('A list of video search results.'),
});
export type YoutubeSearchOutput = z.infer<typeof YoutubeSearchOutputSchema>;

export async function searchYoutubeVideos(input: YoutubeSearchInput): Promise<YoutubeSearchOutput> {
  return searchYoutubeVideosFlow(input);
}

const searchYoutubeVideosFlow = ai.defineFlow(
  {
    name: 'searchYoutubeVideosFlow',
    inputSchema: YoutubeSearchInputSchema,
    outputSchema: YoutubeSearchOutputSchema,
  },
  async (input) => {
    const apiKey = ""; // API Key removed as requested.
    if (!apiKey) {
      throw new Error('YOUTUBE_API_KEY is not set in the environment variables.');
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      input.query
    )}&key=${apiKey}&type=video&maxResults=10`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData);
        throw new Error(`YouTube API request failed: ${errorData.error.message}`);
      }
      const data = await response.json();

      const videos: YoutubeSearchResult[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
      }));

      return { videos };
    } catch (error) {
      console.error('Failed to fetch from YouTube API', error);
      throw error;
    }
  }
);
