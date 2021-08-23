import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private webRequestService: WebRequestService) {}

  createUser(email: string, password: string, isAdmin: boolean) {
    return this.webRequestService.post(`admin/user`, {
      email,
      password,
      isAdmin,
    });
  }

  updateUser(id: string, email: string, isAdmin: boolean) {
    return this.webRequestService.patch(`admin/user/${id}`, { email, isAdmin });
  }

  deleteUser(id: string) {
    return this.webRequestService.delete(`admin/user/${id}`);
  }

  getUsers() {
    return this.webRequestService.get(`admin/user`);
  }

  getUser(id: string) {
    return this.webRequestService.get(`admin/user/${id}`);
  }
}
