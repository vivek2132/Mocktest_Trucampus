import { questionBank, type ClassRange } from '@/lib/questions';
import { QuizClient } from '@/components/quiz/QuizClient';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function generateStaticParams() {
  return Object.keys(questionBank).map((classRange) => ({
    classRange,
  }));
}

export default function QuizPage({ params }: { params: { classRange: string } }) {
  const classRange = params.classRange as ClassRange;
  const questions = questionBank[classRange];

  if (!questions) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
       <header className="p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">QuizWhiz</h1>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <QuizClient questions={questions} classRange={classRange} />
      </main>
    </div>
  );
}
