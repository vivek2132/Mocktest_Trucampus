'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Question } from '@/lib/questions';
import { QuestionDisplay } from './QuestionDisplay';
import { ResultsDisplay } from './ResultsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { TimerIcon } from 'lucide-react';

interface QuizClientProps {
  questions: Question[];
  classRange: string;
}

export function QuizClient({ questions, classRange }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  }, [isSubmitted, questions, answers]);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, handleSubmit]);
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Class {classRange} Mock Test</h2>
            {!isSubmitted && (
                <div className="flex items-center gap-2 font-mono text-lg font-semibold bg-muted px-3 py-1 rounded-md">
                    <TimerIcon className="h-5 w-5" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            )}
          </div>

          {isSubmitted ? (
            <ResultsDisplay questions={questions} answers={answers} score={score} />
          ) : (
            <QuestionDisplay
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswerChange}
              selectedAnswer={answers[questions[currentQuestionIndex].id]}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
