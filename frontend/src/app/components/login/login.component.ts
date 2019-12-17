import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../../users.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  loggedIn: boolean = false;
  wrongPassword: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validate(username, password) {
    this.userService.getUserByUsername(username).subscribe((u) => {
      if(u[0].password===password) {
        this.router.navigate(['/dashboard/' + u[0].id]);
      }
      else {
        let snackBarRef = this._snackBar.open('WRONG PASSWORD!! try again' , 'X');
      }
    });
  }     

  ngOnInit() {
    
  }

}
