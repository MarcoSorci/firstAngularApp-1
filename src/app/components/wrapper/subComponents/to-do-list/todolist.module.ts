import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToDoListComponent } from './to-do-list.component';
import { TaskListElementComponent } from '../task-list-element/task-list-element.component';
import { TasklistModule } from '../task-list-element/tasklist.module';



@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasklistModule
  ],
  exports:[
    ToDoListComponent
  ]
})
export class TodolistModule { }
