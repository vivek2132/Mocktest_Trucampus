import { StudentDetailsForm } from '@/components/quiz/StudentDetailsForm';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RegisterPage({ params }: { params: { classRange: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">TruCampus Mock Quiz</h1>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8 flex items-center justify-center">
        <StudentDetailsForm classRange={params.classRange} />
      </main>
       <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} TruCampus Mock Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}
