import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Task } from 'src/app/model/task';
import { Api2Service } from 'src/app/services/api2.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnChanges {
  @Input() task?: Task;
  @Output() doneEvent: EventEmitter<Task>;

  taskList: Task[] = [];
  selectedTask?: Task;

  // eslint-disable-next-line no-unused-vars
  constructor(private api2S: Api2Service) {
    this.doneEvent = new EventEmitter<Task>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  checkIfIsRecent(task: Task) {
    const now = new Date();
 now.getTime();
    const taskDate = task.creationDate;
taskDate.getTime();
  }

  ngOnInit(): void {
    this.api2S.activeTasks$.subscribe((task) => (this.taskList = task));
  }

  taskDone(task: Task) {
    this.api2S.removeActiveTask(task);
    this.api2S.addDoneTask(task);
    this.api2S.completeTask(task).subscribe({
      next: () => {},
      error: () => {
        this.api2S.addActiveTask(task);
        this.api2S.removeDoneTask(task);
      },
    });
  }

  changeSelected() {
    if (this.taskList.length > 1) {
      this.selectedTask = this.taskList[1];
    }
  }
}
