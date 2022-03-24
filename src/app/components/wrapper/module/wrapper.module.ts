import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoneModule } from '../subComponents/done-list/done.module';
import { FilterModule } from '../subComponents/filter/filter.module';
import { StatisticsModule } from '../subComponents/statistics/statistics.module';
import { TaskinputModule } from '../subComponents/task-input/taskinput.module';
import { TasklistModule } from '../subComponents/task-list-element/tasklist.module';
import { TodolistModule } from '../subComponents/to-do-list/todolist.module';



@NgModule({
  declarations: [
    WrapperComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    DoneModule,
    FilterModule,
    StatisticsModule,
    TaskinputModule,
    TasklistModule,
    TodolistModule
  ]
})
export class WrapperModule { }
