import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Question } from '../question.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: Question[] = [];
  selectedOption: Question | undefined;
  currentQuestionIndex: number= 0; 
  selectedOptionIndex:  number= -1;
  nextQuestion : boolean = false;
  submitButtonEnabled: boolean = false;
  answers: number[] = []; // Store user's answers here

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {}
  

  get selectedUserName(): string {
    return this.userService.selectedUserName;
  }

  ngOnInit(): void {
    this.userService.getQuestion().subscribe(
      questions => {
        this.questions = questions;
        this.answers = new Array(questions.length).fill(-1);
      }
    );
  }

onSelectOption(optionIndex: number): void {
  console.log(`Selected option index: ${optionIndex}`);
  this.selectedOptionIndex = optionIndex;
  this.nextQuestion = true;
  this.answers[this.currentQuestionIndex] = this.selectedOptionIndex;
  console.log(`Current answers array: ${this.answers}`);
  this.submitButtonEnabled = this.isOptionSelected();
}

goToNextQuestion(): void {
  this.answers[this.currentQuestionIndex] = this.selectedOptionIndex; // Save selected answer
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
    this.selectedOptionIndex = this.answers[this.currentQuestionIndex]; // Load next answer
    this.nextQuestion = false; // Disable "Next" button until a new selection is made
  } else {
    // This block is for the last question
    this.submitButtonEnabled = true;
  }
  this.submitButtonEnabled = this.isOptionSelected();
}


  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.answers[this.currentQuestionIndex] = this.selectedOptionIndex; // Save selected answer
      this.currentQuestionIndex--;
      this.selectedOptionIndex = this.answers[this.currentQuestionIndex]; // Load previous answer
      this.nextQuestion = true; // Enable "Next" button
    }
    this.submitButtonEnabled = this.isOptionSelected();

  }
  
  isOptionSelected(): boolean {
    return this.selectedOptionIndex !== -1;
  }
  
 submitAnswers(): void {
  console.log('Submit answers:', this.answers);
  let correctAnswers = 0;
  this.questions.forEach((question, index) => {
    const selectedOptionIndex = this.answers[index];
    console.log('Selected option index:', selectedOptionIndex);
    console.log('Selected option:', question.options[selectedOptionIndex]);
    console.log('Correct answer:', question.answers);

    if (question.answers === question.options[selectedOptionIndex]) {
      correctAnswers++;
    }
    
  });

  Swal.fire(`Thank you...`, `You submitted successfully! Total correct answers: ${correctAnswers}`, 'success');
  this.router.navigate(['/result'], { queryParams: { correctAnswers: correctAnswers } });
}

}