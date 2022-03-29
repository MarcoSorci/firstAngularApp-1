import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';

import { Api2Service } from 'src/app/services/api2.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent {
  public taskModel = { name: '', priority: 0 };
// eslint-disable-next-line no-unused-vars
  constructor(private apiS: Api2Service) {}

  saveTask() {
    const newTask = new Task('', this.taskModel.name, this.taskModel.priority);
    this.apiS.createTask(newTask).subscribe({
      next: (task) => {
        this.apiS.addActiveTask(task);
      },
      error: () => {},
    });
  }
}
