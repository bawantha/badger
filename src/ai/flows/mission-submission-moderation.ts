// This file uses server-side code.
'use server';

/**
 * @fileOverview Automatically flags mission submissions and livestream content that may violate community guidelines, for efficient review and a safe environment.
 *
 * - moderateMissionSubmission - A function that handles the content moderation process.
 * - ModerateMissionSubmissionInput - The input type for the moderateMissionSubmission function.
 * - ModerateMissionSubmissionOutput - The return type for the moderateMissionSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateMissionSubmissionInputSchema = z.object({
  content: z.string().describe('The content of the mission submission or livestream.'),
  contentType: z.enum(['text', 'photo', 'video']).describe('The type of the content being moderated.'),
});
export type ModerateMissionSubmissionInput = z.infer<typeof ModerateMissionSubmissionInputSchema>;

const ModerateMissionSubmissionOutputSchema = z.object({
  flagged: z.boolean().describe('Whether the content is flagged for violating community guidelines.'),
  reason: z.string().describe('The reason for flagging the content, if applicable.'),
});
export type ModerateMissionSubmissionOutput = z.infer<typeof ModerateMissionSubmissionOutputSchema>;

export async function moderateMissionSubmission(input: ModerateMissionSubmissionInput): Promise<ModerateMissionSubmissionOutput> {
  return moderateMissionSubmissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateMissionSubmissionPrompt',
  input: {schema: ModerateMissionSubmissionInputSchema},
  output: {schema: ModerateMissionSubmissionOutputSchema},
  prompt: `You are a content moderation AI that reviews mission submissions and livestream content to ensure it adheres to community guidelines.

  Content Type: {{{contentType}}}
  Content: {{{content}}}

  Determine whether the content should be flagged based on the following community guidelines:
  - No hate speech or discrimination
  - No sexually explicit content
  - No dangerous or illegal activities
  - No harassment or bullying
  - Content must be respectful and appropriate for all users

  Return flagged as true if the content violates any of the above guidelines. Otherwise, return flagged as false.
  If flagged is true, please provide a detailed reason for flagging the content.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const moderateMissionSubmissionFlow = ai.defineFlow(
  {
    name: 'moderateMissionSubmissionFlow',
    inputSchema: ModerateMissionSubmissionInputSchema,
    outputSchema: ModerateMissionSubmissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

