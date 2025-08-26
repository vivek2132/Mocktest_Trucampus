'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function ImproveContentForm() {
  const [state, formAction] = useFormState(getRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="classRange">Class Range</Label>
        <Select name="classRange" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a class range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2-4">Class 2-4</SelectItem>
            <SelectItem value="5-7">Class 5-7</SelectItem>
            <SelectItem value="8-10">Class 8-10</SelectItem>
            <SelectItem value="11-12">Class 11-12</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.classRange && <p className="text-sm text-destructive">{state.errors.classRange[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="averageScore">Average Score (%)</Label>
        <Input
          id="averageScore"
          name="averageScore"
          type="number"
          placeholder="e.g., 65"
          required
        />
        {state.errors?.averageScore && <p className="text-sm text-destructive">{state.errors.averageScore[0]}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="questionCount">Question Count</Label>
        <Input
          id="questionCount"
          name="questionCount"
          type="number"
          placeholder="e.g., 50"
          required
        />
        {state.errors?.questionCount && <p className="text-sm text-destructive">{state.errors.questionCount[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="userFeedback">User Feedback</Label>
        <Textarea
          id="userFeedback"
          name="userFeedback"
          placeholder="e.g., 'The questions felt too easy and repetitive...'"
          required
          rows={4}
        />
        {state.errors?.userFeedback && <p className="text-sm text-destructive">{state.errors.userFeedback[0]}</p>}
      </div>

      <SubmitButton />

      {state.data && (
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-medium">{state.data}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
