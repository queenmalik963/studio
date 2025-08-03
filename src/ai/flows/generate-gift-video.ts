'use server';
/**
 * @fileOverview Generates a dynamic video gift from an image using AI.
 * 
 * - generateGiftVideo - A function that takes a gift image and a prompt to generate a video.
 * - GenerateGiftVideoInput - The input type for the generateGiftVideo function.
 * - GenerateGiftVideoOutput - The return type for the generateGiftVideo function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import * as fs from 'fs';
import { Readable } from 'stream';

const GenerateGiftVideoInputSchema = z.object({
  giftImage: z.string().describe(
    "A still image of the gift, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  prompt: z.string().describe('A text prompt describing how to animate the image.'),
});
export type GenerateGiftVideoInput = z.infer<typeof GenerateGiftVideoInputSchema>;

const GenerateGiftVideoOutputSchema = z.object({
  videoUrl: z.string().describe('The data URI of the generated video.'),
});
export type GenerateGiftVideoOutput = z.infer<typeof GenerateGiftVideoOutputSchema>;

export async function generateGiftVideo(input: GenerateGiftVideoInput): Promise<GenerateGiftVideoOutput> {
  return generateGiftVideoFlow(input);
}

const generateGiftVideoFlow = ai.defineFlow(
  {
    name: 'generateGiftVideoFlow',
    inputSchema: GenerateGiftVideoInputSchema,
    outputSchema: GenerateGiftVideoOutputSchema,
  },
  async ({ giftImage, prompt }) => {
    
    let { operation } = await ai.generate({
        // IMPORTANT: This model supports image-to-video and includes audio generation.
        model: googleAI.model('veo-3.0-generate-preview'),
        prompt: [
            {
              text: prompt,
            },
            {
              media: {
                url: giftImage,
              },
            },
        ],
        // Veo config options
        config: {
            aspectRatio: '16:9',
            personGeneration: 'allow_all',
        },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Poll for completion. This can take a minute.
    while (!operation.done) {
        // Wait for 5 seconds before checking again.
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media && p.media.contentType?.startsWith('video/'));
    
    if (!videoPart || !videoPart.media) {
        throw new Error('Failed to find the generated video in the operation output');
    }

    // In a real production environment, you would download this to a bucket
    // and return a public URL. For this prototype, we will fetch it,
    // base64 encode it, and return it as a data URI directly.
    // This is not efficient for large files but works for short clips.
    const fetch = (await import('node-fetch')).default;
    
    // The media URL from Veo might need the API key for access.
    const videoDownloadUrl = `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`;
    
    const videoResponse = await fetch(videoDownloadUrl);
    if (!videoResponse.ok || !videoResponse.body) {
        throw new Error(`Failed to download generated video. Status: ${videoResponse.status}`);
    }
    
    const videoBuffer = await videoResponse.arrayBuffer();
    const videoBase64 = Buffer.from(videoBuffer).toString('base64');
    const videoDataUri = `data:${videoPart.media.contentType || 'video/mp4'};base64,${videoBase64}`;

    return {
      videoUrl: videoDataUri,
    };
  }
);
