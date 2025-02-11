import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/model/task';


@Component({
  selector: 'app-task-list-element',
  templateUrl: './task-list-element.component.html',
  styleUrls: ['./task-list-element.component.scss']
})
export class TaskListElementComponent{
  
  @Input() task?: Task;

  @Output() doneEvent: EventEmitter<Task>;

  constructor() {
    this.doneEvent = new EventEmitter<Task>()
  }


  taskClicked(event: any){
    if (this.task) {
      this.doneEvent.emit(this.task);
    }
    event.stopPropagation()
  }

}
