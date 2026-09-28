import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tasks',
  imports: [TableModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {}
