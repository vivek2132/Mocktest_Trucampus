'use client';

import type { Question } from '@/lib/questions';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

interface ResultsDisplayProps {
  questions: Question[];
  answers: Record<number, string>;
  score: number;
}

export function ResultsDisplay({ questions, answers, score }: ResultsDisplayProps) {
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const chartData = [
    { name: 'Correct', value: score, fill: 'hsl(var(--correct))' },
    { name: 'Incorrect', value: totalQuestions - score, fill: 'hsl(var(--destructive))' },
  ];

  const chartConfig = {
    score: {
      label: "Score",
    },
    correct: {
      label: "Correct",
    },
    incorrect: {
      label: "Incorrect",
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Test Complete!</CardTitle>
          <CardDescription>Here's how you performed.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
           <div className="flex flex-col items-center">
            <p className="text-lg text-muted-foreground">Your Score</p>
            <p className="text-6xl font-bold text-primary">{percentage}%</p>
            <p className="text-muted-foreground">
              {score} out of {totalQuestions} correct
            </p>
          </div>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-48">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} strokeWidth={2}>
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Review Your Answers</h3>
        {questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <Card key={question.id}>
              <CardContent className="p-6">
                <p className="mb-4 font-semibold text-lg font-code">{index + 1}. {question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option) => {
                    const isUserAnswer = userAnswer === option;
                    const isCorrectAnswer = question.correctAnswer === option;
                    
                    return (
                      <div
                        key={option}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-md border text-sm',
                          isCorrectAnswer && 'bg-correct/10 border-correct text-correct',
                          isUserAnswer && !isCorrect && 'bg-destructive/10 border-destructive text-destructive'
                        )}
                      >
                        {isCorrectAnswer ? (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        ) : isUserAnswer ? (
                          <XCircle className="h-5 w-5 flex-shrink-0" />
                        ) : (
                          <HelpCircle className="h-5 w-5 flex-shrink-0 text-muted-foreground/50" />
                        )}
                        <span className="flex-1">{option}</span>
                      </div>
                    );
                  })}
                </div>
                 {!userAnswer && (
                    <div className="mt-4 p-3 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-sm">
                      You did not answer this question. The correct answer was: <strong>{question.correctAnswer}</strong>
                    </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
