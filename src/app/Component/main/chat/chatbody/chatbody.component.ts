import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendlistService } from 'src/app/Service/friendlist.service';
import { Friend } from '../../../../Model/friend';
import { WebsocketService } from 'src/app/Service/websocket.service';
import { Icons } from 'src/app/Model/icons';

@Component({
  selector: 'app-chatbody',
  templateUrl: './chatbody.component.html',
  styleUrls: ['./chatbody.component.scss']
})
export class ChatbodyComponent implements OnInit {
  friend: any;
  public iconalt: string[]=["😁","😆","😅","😍"];
  public icons  : Icons[] = [];
  public    isShowIcon: boolean = false;
  constructor(private route: ActivatedRoute, private friendlistService: FriendlistService, private websocketservice: WebsocketService) { }

  ngOnInit(): void {
    this.createIcons();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.friendlistService.getFriendWithID(id).subscribe((data: Friend) => {
        this.friend = data;
        localStorage.setItem('friendName', this.friend.username);
      });
    })
  }
  sendMessage(ele: HTMLInputElement) {
    let x = document.getElementsByClassName('content-left-body')[0];
    let length = x.getElementsByClassName('main-body').length;
    if (length > 0) {
      let y = x.getElementsByClassName('main-body');
      let y1 = y[length - 1];
      if (y1.classList.contains('outgoing_group')) {
        let q = document.createElement('div');
        q.classList.add('row');
        q.style.paddingRight = '10px';
        q.style.textAlign = 'right';
        let q2 = document.createElement('div');
        q2.classList.add('main-contain');
        q2.style.display = "inline-block";
        q2.style.backgroundColor = "#0099ff";
        q2.style.borderRadius = "18px";
        q2.style.padding = "5px 12px 5px 12px";
        q2.style.marginTop = "3px";
        let q3 = document.createElement('span');
        q3.innerHTML = ele.value;
        q3.style.color = 'white';
        q3.style.fontFamily = "'Times New Roman', Times, serif";
        q2.appendChild(q3);
        q.appendChild(q2);
        y1.appendChild(q);
      } else {
        let q = document.createElement('div');
        q.classList.add('main-body');
        q.classList.add('outgoing_group');
        q.style.display = 'flex';
        q.style.position = 'relative';
        q.style.display = 'block';
        let q1 = document.createElement('div');
        q1.classList.add('row');
        q1.style.paddingRight = '10px';
        q1.style.textAlign = 'right';
        let q2 = document.createElement('div');
        q2.classList.add('main-contain');
        q2.style.display = "inline-block";
        q2.style.backgroundColor = "#0099ff";
        q2.style.borderRadius = "18px";
        q2.style.padding = "5px 12px 5px 12px";
        q2.style.marginTop = "3px";
        let q3 = document.createElement('span');
        q3.innerHTML = ele.value;
        q3.style.color = 'white';
        q3.style.fontFamily = "'Times New Roman', Times, serif";
        q1.appendChild(q2);
        q2.appendChild(q3);
        q.appendChild(q1);
        x.appendChild(q);
      }
      this.websocketservice.sendChatToServer(this.friend.username, ele.value);
      ele.value = '';
    } else {
      let q = document.createElement('div');
      q.classList.add('main-body');
      q.classList.add('outgoing_group');
      q.style.display = 'flex';
      q.style.position = 'relative';
      q.style.display = 'block';
      let q1 = document.createElement('div');
      q1.classList.add('row');
      q1.style.paddingRight = '10px';
      q1.style.textAlign = 'right';
      let q2 = document.createElement('div');
      q2.classList.add('main-contain');
      q2.style.display = "inline-block";
      q2.style.backgroundColor = "#0099ff";
      q2.style.borderRadius = "18px";
      q2.style.padding = "5px 12px 5px 12px";
      q2.style.marginTop = "3px";
      let q3 = document.createElement('span');
      q3.innerHTML = ele.value;
      q3.style.color = 'white';
      q3.style.fontFamily = "'Times New Roman', Times, serif";
      q1.appendChild(q2);
      q2.appendChild(q3);
      q.appendChild(q1);
      x.appendChild(q);
    }    
  }
  addIcon(indexIcon: string|number): void {
   
    let x= document.getElementById("sendMessage") as HTMLInputElement;
    let img= document.getElementById("img") as HTMLImageElement ;
    for (let i = 0; i < this.icons.length; i++){
   
     
      if(i==indexIcon){
      img.alt=this.iconalt[i];
    }

  }
  console.log(img.alt);
  x.value +=img.alt;
}
createIcons(): void {
   
  for (let i = 0; i <= 3; i++) {
    

    this.icons.push(new Icons(`assets/image/1f60${i}.png`,this.iconalt[i]));
  
  }
  console.log(this.icons);

}
hideOrUnhideIcon():void {
  this.isShowIcon = !this.isShowIcon;
  console.log(this.isShowIcon);
}
hiden(){
  this.isShowIcon=false;
}
}
