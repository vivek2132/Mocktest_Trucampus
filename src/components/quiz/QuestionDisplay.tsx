'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Question } from '@/lib/questions';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, answer: string) => void;
  selectedAnswer?: string;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  onNext,
  onPrev,
  onSubmit,
}: QuestionDisplayProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </div>

      <p className="text-xl md:text-2xl font-semibold font-code bg-muted/50 p-4 rounded-lg">
        {question.question}
      </p>

      <RadioGroup
        value={selectedAnswer}
        onValueChange={(value) => onAnswer(question.id, value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {question.options.map((option, index) => (
          <Label
            key={index}
            className={`flex items-center gap-4 p-4 border rounded-md cursor-pointer transition-colors hover:bg-accent ${
              selectedAnswer === option
                ? 'bg-primary/10 border-primary ring-2 ring-primary'
                : ''
            }`}
          >
            <RadioGroupItem value={option} id={`option-${index}`} />
            <span className="text-base">{option}</span>
          </Label>
        ))}
      </RadioGroup>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={questionNumber === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {questionNumber === totalQuestions ? (
          <Button onClick={onSubmit}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Submit Test
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!selectedAnswer}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
