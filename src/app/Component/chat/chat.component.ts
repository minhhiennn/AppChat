import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Service/user.service';
import { FriendlistService } from 'src/app/Service/friendlist.service';
import { Friend } from '../../Model/friend';
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
  idNumberActive: any;
  url: string = "http://localhost:3000/listfriend";
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private friendlistService: FriendlistService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.friendlistService.getListFriend().subscribe((data: Friend[]) => {
      this.listFriend = data;
    })
    console.log('ahihi');
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idNumberActive = id;
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
    //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //this.router.navigate(['/chat',id]));
    this.router.navigate(['/chat', id]);
  }
}
