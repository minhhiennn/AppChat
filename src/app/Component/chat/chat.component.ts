import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Service/user.service';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../../Model/friend';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentUser: User | null = null;
  listFriend: Friend[] = [];
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.http.get<Friend[]>(this.url).subscribe((data: Friend[]) => {
      this.listFriend = data;
    });
  }
  isActive(username: string): boolean {
    if (username == "teo") {
      return true;
    } else {
      return false;
    }
  }
}
