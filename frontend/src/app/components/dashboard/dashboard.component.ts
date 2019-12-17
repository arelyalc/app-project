import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../../users.service';
import { QuestionService } from '../../questions.service';
import {ActivatedRoute} from '@angular/router';
import { User } from 'src/app/user.model';
import { Question } from 'src/app/question.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;
  createForm: FormGroup;
  createForm2: FormGroup;
  id: number;
  questions: Question [] = [];
  allQ: Question [];
  currentUser: User;

  constructor(private userService: UserService, private questionService: QuestionService,
    private fb: FormBuilder, private router: Router, private _route : ActivatedRoute, private _snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      name: [''],
      email: [''],
      username: ['']
    });

    this.createForm2 = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this._route.paramMap.subscribe((params)=>{
      this.id = +params.get('id')
     }); 
    this.userService.getUserById(this.id).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  

  ngOnInit() {
    this.questionService.getQuestionById(this.id).subscribe((qs) => {
      this.questions = qs;
    })

    this.questionService.getQuestions().subscribe((q) => {
      this.allQ = q;
    })
  }

  addQuestion(question, answer) {
    var q = {question: question, answer: answer, user_id: this.id};
    console.log(q);
    this.questionService.add(q).subscribe(() => {
      let snackBarRef = this._snackBar.open('your question was added!');
    });
  }

  updateUser(name, email, username) {
    if(name!== undefined && name!==this.currentUser.name) {
      this.currentUser.name = name;
    }
    if(email !== undefined && email!==this.currentUser.email) {
      this.currentUser.email = email;
    }
    if(username!== undefined && username!==this.currentUser.username) {
      this.currentUser.username = username;
    }
    // this.userService.updateUser(this.currentUser._id, this.currentUser.name, this.currentUser.email, this.currentUser.username, this.currentUser.password).subscribe(() =>{

    // });
  }

}
