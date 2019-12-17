import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../../users.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser(name, email, username, password) {
    var user = {name: name, email: email, username: username, password: password};
    this.userService.add(user).subscribe(() => {
    });
    this.userService.getUserByUsername(username).subscribe((u) => {
      this.router.navigate(['/dashboard/' + u[0].id]);
    })
  }

  ngOnInit() {
  }

}
