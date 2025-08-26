import Link from 'next/link';
import { ArrowLeft, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImproveContentForm } from '@/components/admin/ImproveContentForm';
import { Logo } from '@/components/Logo';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">QuizWhiz - Admin Panel</h1>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Bot className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Content Improvement AI</CardTitle>
              </div>
              <CardDescription>
                Analyze user performance and feedback to get AI-powered recommendations for improving your question bank. This tool is especially useful when the question count is low or user scores are inconsistent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImproveContentForm />
            </CardContent>
          </Card>
        </div>
      </main>
       <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Admin tools for QuizWhiz</p>
      </footer>
    </div>
  );
}
