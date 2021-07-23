import { Component, OnInit } from '@angular/core';
import { User } from '../../../Model/user';
import { UserService } from 'src/app/Service/user.service';
import { FriendlistService } from 'src/app/Service/friendlist.service';
import { Friend } from '../../../Model/friend';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentUser: User | null = null;
  listFriend: Friend[] = [];
  idNumberActive: number = 1;
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private friendlistService: FriendlistService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.friendlistService.getListFriend().subscribe((data: Friend[]) => {
      this.listFriend = data;
    })
  }
  isActive(id: number): boolean {
    if (id == this.idNumberActive) {
      return true;
    } else {
      return false;
    }
  }
  changeRoute(id: number) {
    let x = document.getElementsByClassName('message');
    for (let i = 0; i < x.length; i++) {
      let y = x[i].getElementsByTagName('span')[0];
      y.style.color = '#97989a';
    }
    this.idNumberActive = id;
    this.router.navigateByUrl('/main/chat', { skipLocationChange: true }).then(() =>
      this.router.navigate(['main/chat', id]));
    //this.router.navigate(['main/chat', id]);
  }
}
