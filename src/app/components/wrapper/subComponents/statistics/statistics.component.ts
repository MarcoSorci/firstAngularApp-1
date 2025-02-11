import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Api2Service } from 'src/app/services/api2.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  public activeCount: number = 0;
  public doneCount: number = 0;
  public recentActive?: Task;
  public recentDone?: Task;
// eslint-disable-next-line no-unused-vars
  constructor(private apiS: Api2Service) {}

  ngOnInit(): void {
    this.apiS.getActiveCount().subscribe((num) => this.activeCount = num);
    this.apiS.getDoneCount().subscribe((num) => this.doneCount = num);
    this.apiS.recentActive().subscribe((task) => {
      if (task) {
        this.recentActive = task;
      }
    });
    this.apiS.recentDone().subscribe((task) => {
      if (task) {
        this.recentDone = task
      }
    });
  }
}
