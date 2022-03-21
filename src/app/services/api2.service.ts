import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class Api2Service {
  private readonly API_URL =
    'https://623436dd6d5465eaa51607ba.mockapi.io/task/';

  public activeTasks$ = new BehaviorSubject<Task[]>([]);
  public doneTasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.getActiveTasks();
    this.getDoneTasks();
  }

  getActiveTasks(filter?: string) {
    let filterParam = '';
    if (filter) {
      filterParam = '?search=' + filter;
    }
    this.http
      .get<any[]>(this.API_URL + filterParam)
      .pipe(
        map(tasks => tasks.filter(t => t.doneDate === null)),
        map((tasks) => tasks.map((t) => this.parseTask(t)))
      )
      .subscribe((tasks) => this.activeTasks$.next(tasks));
  }

  removeActiveTask(task: Task) {
    let activeArray = this.activeTasks$.value;
    activeArray = activeArray.filter((t) => t.id !== task.id);
    this.activeTasks$.next(activeArray);
  }

  addActiveTask(task: Task) {
    let activeArray = this.activeTasks$.value;
    activeArray.push(task);
    this.activeTasks$.next(activeArray);
  }

  getDoneTasks(filter?: string) {
    let filterParam = '';
    if (filter) {
      filterParam = '?search=' + filter;
    }
    this.http
      .get<Task[]>(this.API_URL + filterParam)
      .pipe(
        map((tasks) => tasks.filter((t) => t.doneDate !== null)),
        map((tasks) => tasks.map((t) => this.parseTask(t)))
      )
      .subscribe((tasks) => this.doneTasks$.next(tasks));
  }

  removeDoneTask(task: Task) {
    let doneArray = this.doneTasks$.value;
    doneArray = doneArray.filter((t) => t.id !== task.id);
    this.doneTasks$.next(doneArray);
  }

  addDoneTask(task: Task) {
    let doneArray = this.doneTasks$.value;
    doneArray.push(task);
    this.doneTasks$.next(doneArray);
  }

  getSingleTask(taskId: string): Observable<Task | undefined> {
    return this.http
      .get<any>(this.API_URL + '/' + taskId)
      .pipe(map((taskObj) => this.parseTask(taskObj)));
  }

  createTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<Task>(this.API_URL, task.toDatabaseModel(), httpOptions)
      .pipe(map((taskObj) => this.parseTask(taskObj)));
  }

  deleteTask(taskId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<any>(this.API_URL + '/' + taskId, httpOptions);
  }

  completeTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    task.doneDate = new Date();
    return this.http
      .put<Task>(
        this.API_URL + '/' + task.id,
        task.toDatabaseModel(),
        httpOptions
      )
      .pipe(map((taskObj) => this.parseTask(taskObj)));
  }

  parseTask(obj: any): Task {
    const task = new Task(obj.id, obj.name, obj.priority, obj.creationDate);
    if (obj.doneDate) {
      task.doneDate = new Date(obj.doneDate);
    }
    return task;
  }

  getActiveCount(): Observable<number> {
    return this.activeTasks$.pipe(map((arr) => arr.length));
  }

  getDoneCount(): Observable<number> {
    return this.doneTasks$.pipe(map((arr) => arr.length));
  }

  recentActive(): Observable<Task | undefined> {
    return this.activeTasks$.pipe(map((arr) => this.checkData(arr)));
  }

  recentDone(): Observable<Task | undefined> {
    return this.doneTasks$.pipe(map((arr) => this.checkData(arr)));
  }

  checkData(arr: Task[]): Task | undefined {
    if (arr.length > 0) {
      let currentTask: Task = arr[0];
      let currentDate: number = arr[0].creationDate.getTime();

      for (let i = 1; i < arr.length; i++) {
        const el = arr[i];
        if (el.creationDate.getTime() > currentDate) {
          currentDate = el.creationDate.getTime();
          currentTask = el;
        }
      }
      return currentTask;
    } else {
      return undefined;
    }
  }
}
