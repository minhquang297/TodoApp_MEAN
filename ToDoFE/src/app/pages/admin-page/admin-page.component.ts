import { User } from './../../models/user.model';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  users!: User[];
  user!: User;
  selectedUserId!: string;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.selectedUserId = params.id;
        this.adminService.getUser(params.id).subscribe((user: any) => {
          this.user = user;
        });
      } else {
        this.user = {};
      }
    });

    this.adminService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  onUserUpdateClick(email: string, isAdmin: boolean): void {
    this.adminService
      .updateUser(this.selectedUserId, email, isAdmin)
      .subscribe(() => {
        this.router.navigate(['admin']);
      });
  }

  onUserDeleteClick(id: any): void {
    this.adminService.deleteUser(id).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }

  logout() {
    this.auth.logout();
  }
}
