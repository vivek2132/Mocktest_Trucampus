'use server';

import { improveQuestionBankContent, type ImproveQuestionBankContentInput } from '@/ai/flows/improve-question-bank-content';
import { z } from 'zod';

const formSchema = z.object({
  classRange: z.string().min(1, 'Class range is required.'),
  userFeedback: z.string().min(10, 'Feedback must be at least 10 characters.'),
  averageScore: z.coerce.number().min(0).max(100, "Average score must be between 0 and 100."),
  questionCount: z.coerce.number().int().positive('Question count must be a positive number.'),
});

export async function getRecommendations(
  prevState: any,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const input: ImproveQuestionBankContentInput = {
      ...validatedFields.data,
      averageScore: validatedFields.data.averageScore / 100, // Assuming the flow expects a 0-1 scale
    };
    
    const result = await improveQuestionBankContent(input);
    
    return {
      message: 'Successfully generated recommendations.',
      errors: null,
      data: result.recommendations,
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: null,
      data: null,
    };
  }
}
