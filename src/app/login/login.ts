import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api-service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule,InputTextModule,ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  private apiService=inject(ApiService);
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    });
    
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log('Form raw value:'+this.loginForm.value);
      this.apiService.loginUser(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log('User logged in successfully:',response);
        },
        error:(error)=>{
          console.error('Error logging in user:',error);
        }
      });
    }
  }
}
