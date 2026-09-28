import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api=inject(DataService);

  //authentication methods
  registerUser(userData: any) {
    return this.api.post<any>('/auth/register', userData);
  }

  loginUser(credentials: any) {
    return this.api.postText('/auth/login', credentials).pipe(
      tap((token: string) => {
        console.log('LOGIN TOKEN:', token);
        const cleanedToken = token.replace(/^Bearer\s+/i, '');
        localStorage.setItem('authToken', cleanedToken);
        console.log('TOKEN STORED:',localStorage.getItem('authToken'));
      })
    );
  }

  //employee management methods
  getEmployees() {
    return this.api.get<any[]>('/employees');
  }
  getEmployeeById(id: number) {
    return this.api.get<any>(`/employees/${id}`);
  }
  createEmployee(employeeData: any) {
    return this.api.post<any>('/employees', employeeData);
  }
  updateEmployee(id: number, employeeData: any) {
    return this.api.put<any>(`/employees/${id}`, employeeData);
  }
  deleteEmployee(id: number) {
    return this.api.delete<void>(`/employees/${id}`);
  }

  //tasks management methods
  getTasks() {
    return this.api.get<any[]>('/tasks');
  }
  getTaskById(id: number) {
    return this.api.get<any>(`/tasks/${id}`);
  }
  getTasksByEmployeeId(employeeId: number) {
    return this.api.get<any[]>(`/tasks/employee/${employeeId}`);
  }
  createTask(taskData: any) {
    return this.api.post<any>('/tasks', taskData);
  }
  updateTask(id: number, taskData: any) {
    return this.api.put<any>(`/tasks/${id}/status`, taskData);
  }
  deleteTask(id: number) {
    return this.api.delete<void>(`/tasks/${id}`);
  }

  //Leaves management methods
  getLeaves() {
    return this.api.get<any[]>('/leaves');
  }
  getLeaveById(id: number) {
    return this.api.get<any>(`/leaves/${id}`);
  }
  getLeavesByEmployeeId(employeeId: number) {
    return this.api.get<any[]>(`/leaves/employee/${employeeId}`);
  }
  createLeave(leaveData: any) {
    return this.api.post<any>('/leaves', leaveData);
  }
  approveLeave(id: number, leaveData: any) {
    return this.api.put<any>(`/leaves/${id}/approve`, leaveData);
  }
  rejectLeave(id: number, leaveData: any) {
    return this.api.put<any>(`/leaves/${id}/reject`, leaveData);
  }
  cancelLeave(id: number, leaveData: any) {
    return this.api.put<any>(`/leaves/${id}/cancel`, leaveData);
  }
  
 
}
