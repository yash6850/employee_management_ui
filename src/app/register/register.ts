import { Component, inject } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule,InputTextModule,ButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  user={
    username:'',
    role:'',
    password:''
  }
  private apiService=inject(ApiService);
 
  onSubmit(form:any){
    if(form.valid){
      console.log(this.user);
      console.log('Form raw value:'+form.value);
      this.apiService.registerUser(this.user).subscribe({
        next:(response)=>{
          console.log('User registered successfully:',response);
        },
        error:(error)=>{
          console.error('Error registering user:',error);
        }
      });
    }
  }
}
