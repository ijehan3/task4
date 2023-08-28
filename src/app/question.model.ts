export interface Question {
      id: number;
      questionText: string;
      options: string[];
      selectedOption: string | null; // Store the selected option for each question
      answers: string;
  }