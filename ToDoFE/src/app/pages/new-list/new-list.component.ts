import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private route: Router) {}

  ngOnInit(): void {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      console.log(list);
      this.route.navigate(['/lists', list._id]);
    });
  }
}
