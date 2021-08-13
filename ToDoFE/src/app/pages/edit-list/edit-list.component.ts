import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  listId!: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.listId = params.listId;
      }
    });
  }

  updateList(title: string): void {
    this.taskService.updateList(this.listId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    });
  }
}
