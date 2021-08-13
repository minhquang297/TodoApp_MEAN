import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskId!: string;
  listId!: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.taskId) {
        this.taskId = params.taskId;
        this.listId = params.listId;
      }
    });
  }

  updateTask(title: string): void {
    this.taskService
      .updateTask(this.listId, this.taskId, title)
      .subscribe(() => {
        this.router.navigate(['/lists', this.taskId]);
      });
  }
}
