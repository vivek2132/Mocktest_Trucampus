'use server';

/**
 * @fileOverview Analyzes user performance and feedback on the question bank to provide recommendations for content improvement.
 *
 * - improveQuestionBankContent - A function that suggests improvements to the question bank content based on user data.
 * - ImproveQuestionBankContentInput - The input type for the improveQuestionBankContent function.
 * - ImproveQuestionBankContentOutput - The return type for the improveQuestionBankContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveQuestionBankContentInputSchema = z.object({
  classRange: z
    .string()
    .describe('The class range for the question bank (e.g., "2-4", "5-7").'),
  userFeedback: z
    .string()
    .describe('User feedback on the question bank content.'),
  averageScore: z
    .number()
    .describe('The average score of users on the question bank.'),
  questionCount: z
    .number()
    .describe('The number of questions currently in the question bank.'),
});
export type ImproveQuestionBankContentInput = z.infer<
  typeof ImproveQuestionBankContentInputSchema
>;

const ImproveQuestionBankContentOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Recommendations for improving the question bank content, such as adjusting difficulty or suggesting new topics.'
    ),
});
export type ImproveQuestionBankContentOutput = z.infer<
  typeof ImproveQuestionBankContentOutputSchema
>;

export async function improveQuestionBankContent(
  input: ImproveQuestionBankContentInput
): Promise<ImproveQuestionBankContentOutput> {
  return improveQuestionBankContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveQuestionBankContentPrompt',
  input: {schema: ImproveQuestionBankContentInputSchema},
  output: {schema: ImproveQuestionBankContentOutputSchema},
  prompt: `You are an expert educational content improver.

You are provided with user feedback, the average score of users, and the current question count for a question bank for a specific class range. Your task is to analyze this information and provide recommendations for improving the question bank content.

Class Range: {{{classRange}}}
User Feedback: {{{userFeedback}}}
Average Score: {{{averageScore}}}
Question Count: {{{questionCount}}}

Based on this information, provide specific and actionable recommendations for improving the question bank content. Consider suggesting adjustments to difficulty, new topics to cover, or ways to make the questions more engaging.`,
});

const improveQuestionBankContentFlow = ai.defineFlow(
  {
    name: 'improveQuestionBankContentFlow',
    inputSchema: ImproveQuestionBankContentInputSchema,
    outputSchema: ImproveQuestionBankContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
