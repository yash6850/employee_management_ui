import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ToastModule, RippleModule, ButtonModule, TableModule, InputTextModule, FormsModule],
  providers: [MessageService],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class Employees implements OnInit {
  originalData: any = {};
  products: any[] = [];
  columns: any[] = [];
  private messageService=inject(MessageService);
  private apiService=inject(ApiService);

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.apiService.getEmployees().subscribe({
      next: (data) => {
        this.products = data;
        this.columns = Object.keys(data[0] || {}).map((key) => ({ field: key, header: key}))
      },
      error: (error) => {
        this.products = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load employees. Please try again later.' });
      },
    });
  }
  onRowEditInit(product: any) {
    // Store the original data in a temporary variable
    this.originalData = { ...product };
  }

  onRowEditSave(product: any) {
    // Call the API to update the employee data
    this.apiService.updateEmployee(product.id, product).subscribe({
      next: (data) => {
        Object.assign(product, data); // Update the product with the response data
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully.' });
      },
      error: (error) => {
        // If there's an error, revert to the original data
        Object.assign(product, this.originalData);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to update employee. Please try again later.' });
      },
    });
  }

  onRowEditCancel(product: any, index: number) {
    // Revert to the original data when editing is canceled
    Object.assign(this.products[index], this.originalData);
  }

}
