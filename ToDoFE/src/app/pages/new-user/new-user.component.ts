import { User } from './../../models/user.model';
import { Router } from '@angular/router';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  constructor(private adminService: AdminService, private route: Router) {}

  ngOnInit(): void {}
  createUser(email: string, password: string, isAdmin: boolean): void {
    this.adminService
      .createUser(email, password, isAdmin)
      .subscribe((user: User) => {
        console.log(user);
        this.route.navigate(['admin', 'user', user._id]);
      });
  }
}
