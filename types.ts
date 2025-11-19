
export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  block: string;
  question: string;
  answers: Answer[];
  isDemographic?: boolean;
}
