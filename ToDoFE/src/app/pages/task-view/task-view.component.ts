import { AuthService } from 'src/app/auth.service';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists!: List[];
  tasks!: Task[] | undefined;

  selectedListId!: string;
  isAdmin!: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((task: any) => {
          this.tasks = task;
        });
      } else {
        this.tasks = undefined;
      }
    });

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe((res) => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
    });
  }

  onTaskDeleteClick(taskId: any) {
    this.taskService
      .deleteTask(this.selectedListId, taskId)
      .subscribe((res: any) => {
        this.tasks = this.tasks?.filter((val) => val._id !== taskId);
      });
  }

  logout() {
    this.auth.logout();
  }
}
