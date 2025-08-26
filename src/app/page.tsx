import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cog } from 'lucide-react';
import { Logo } from '@/components/Logo';

const classRanges = [
  { range: '2-4', description: 'Elementary Level' },
  { range: '5-7', description: 'Middle School Level' },
  { range: '8-10', description: 'High School Foundation' },
  { range: '11-12', description: 'Senior Secondary' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">TruCampus Mock Quiz</h1>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <Cog className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a class range to start a mock test. Each test has a 30-minute time limit.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classRanges.map((item) => (
            <Link href={`/register/${item.range}`} key={item.range} className="group">
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
                <CardHeader className="flex-1">
                  <CardTitle className="text-2xl">Class {item.range}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <Button className="w-full" variant="outline">
                    Start Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} TruCampus Mock Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}
