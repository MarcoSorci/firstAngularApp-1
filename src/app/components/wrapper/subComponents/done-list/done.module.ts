import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoneListComponent } from './done-list.component';
import { TasklistModule } from '../task-list-element/tasklist.module';



@NgModule({
  declarations: [
    DoneListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasklistModule
  ],
  exports:[
    DoneListComponent
  ]
})
export class DoneModule { }
