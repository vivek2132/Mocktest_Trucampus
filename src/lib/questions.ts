export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export type ClassRange = '2-4' | '5-7' | '8-10' | '11-12';

export const questionBank: Record<ClassRange, Question[]> = {
  '2-4': [
    {
      id: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      id: 2,
      question: 'Which animal says "moo"?',
      options: ['Cat', 'Dog', 'Cow', 'Sheep'],
      correctAnswer: 'Cow',
    },
    {
      id: 3,
      question: 'How many sides does a triangle have?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
    },
  ],
  '5-7': [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'What is 12 * 12?',
      options: ['144', '124', '134', '154'],
      correctAnswer: '144',
    },
    {
      id: 3,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
  ],
  '8-10': [
    {
      id: 1,
      question: 'What is the chemical symbol for water?',
      options: ['O2', 'CO2', 'H2O', 'NaCl'],
      correctAnswer: 'H2O',
    },
    {
      id: 2,
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 'William Shakespeare',
    },
    {
      id: 3,
      question: 'What is the value of Pi (to two decimal places)?',
      options: ['3.14', '3.15', '3.16', '3.12'],
      correctAnswer: '3.14',
    },
  ],
  '11-12': [
    {
      id: 1,
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Cell Wall'],
      correctAnswer: 'Mitochondrion',
    },
    {
      id: 2,
      question: 'In which year did the first man land on the moon?',
      options: ['1965', '1969', '1972', '1981'],
      correctAnswer: '1969',
    },
    {
      id: 3,
      question: 'Solve for x: 2x + 5 = 15',
      options: ['x = 10', 'x = 7.5', 'x = 5', 'x = 2.5'],
      correctAnswer: 'x = 5',
    },
  ],
};
