import { Component, OnInit } from '@angular/core';
import { User } from '../../../Model/user';
import { UserService } from 'src/app/Service/user.service';
import { ListChatService } from 'src/app/Service/listchat.service';
import { listChat } from 'src/app/Model/listchat';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentUser: User | null = null;
  listChat: listChat[] = [];
  idNumberActive: number = 1;
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private friendlistService: ListChatService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.friendlistService.getListFriend().subscribe((data: listChat[]) => {
      this.listChat = data;
    })
  }
  isActive(id: number): boolean {
    if (id == this.idNumberActive) {
      return true;
    } else {
      return false;
    }
  }
  changeRoute(friend: listChat) {
    let x = document.getElementById(friend.username)?.getElementsByClassName('information')[0].getElementsByClassName('message')[0].getElementsByTagName('span')[0] as HTMLElement;
    x.style.color = '#97989a';
    this.idNumberActive = friend.id;
    this.router.navigateByUrl('/main/chat', { skipLocationChange: true }).then(() =>
      this.router.navigate(['main/chat', friend.id]));
    //this.router.navigate(['main/chat', id]);
  }
}
