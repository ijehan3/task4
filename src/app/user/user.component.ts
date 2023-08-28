import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name: string = '';
  users: User[] = [];
  selectedUser: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSelectUser(event: any): void {
    const selectedUserId = +event.target.value; // Convert to number using '+' prefix
    this.selectedUser = this.users.find(user => user.id === selectedUserId);
    if (this.selectedUser) {
      this.userService.selectedUserName = this.selectedUser.name;
    }  
  }
}

