import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from '../Model/user';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  wsUrl: string = 'ws://203.113.148.132:23023/chat/chat';
  private ws = webSocket(this.wsUrl);
  constructor(private router: Router, private userService: UserService) {
    this.getMessageFromServer();
  }
  getHistoryChat(name: string) {
    let data = {
      "action": "onchat",
      "data": {
        "event": "GET_PEOPLE_CHAT_MES",
        "data": {
          "name": name,
          "page": 1
        }
      }
    }
    this.ws.next(data);
  }
  LoginToServer(username: string, password: string) {
    let data = {
      "action": "onchat",
      "data": {
        "event": "LOGIN",
        "data": {
          "user": username,
          "pass": password
        }
      }
    }
    // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!  
    this.ws.next(data);
  }
  getMessageFromServer() {
    this.ws.subscribe(
      (msg: any) => {
        let event = Object.values(msg)[1];
        switch (event) {
          case 'LOGIN':
            let status: string = Object.values(msg)[0] as string;
            let mes: string = Object.values(msg)[2] as string;
            this.checkLogin(status, mes);
            break;
          case 'SEND_CHAT':
            let t = msg.data.mes;
            let r = msg.data.type;
            // r == 0 là chat people to people
            if (r == 0) {
              let w = msg.data.name;
              let q = localStorage.getItem('friendName');
              if (w == q) {
                this.createContentChatForPeopleFriend(t);
              } else {
                let m = document.getElementById(w) as HTMLElement;
                let n = m.getElementsByClassName('information')[0].getElementsByClassName('message')[0];
                let b = n.getElementsByTagName('span')[0];
                b.innerHTML = w + ": " + t;
                b.style.color = '#141414';
              }
              // r == 1 là chat people to room
            } else {
              let w = msg.data.to;
              let w1 = msg.data.name;
              let q = localStorage.getItem('friendName');
              if (w == q) {
                let x = document.getElementById('main') as HTMLElement;
                let y = x.getElementsByClassName('main-body');
                let length = x.getElementsByClassName('main-body').length;
                if (length > 0) {
                  let y1 = y[length - 1];
                  if (y1.classList.contains('incoming_group')) {
                    let y2 = y1.getElementsByClassName('content-chat')[0];
                    let y3 = y2.getElementsByClassName('people-name')[0].getElementsByTagName('span')[0];
                    if (y3.textContent == w1) {
                      let z = document.createElement('div');
                      z.classList.add('row');
                      let z1 = document.createElement('div');
                      z1.classList.add('main-contain');
                      let z2 = document.createElement('span');
                      z2.innerHTML = t;
                      z1.appendChild(z2);
                      z.appendChild(z1);
                      y2.appendChild(z);
                    } else {
                      this.createContentChatForRoomChat(x, w1, t);
                    }
                  } else {
                    this.createContentChatForRoomChat(x, w1, t);
                  }
                } else {
                  this.createContentChatForRoomChat(x, w1, t);
                }
              } else {
                let m = document.getElementById(w) as HTMLElement;
                let n = m.getElementsByClassName('information')[0].getElementsByClassName('message')[0];
                let b = n.getElementsByTagName('span')[0];
                b.innerHTML = w1 + ": " + t;
                b.style.color = '#141414';
              }
            }
            break;
          case 'GET_PEOPLE_CHAT_MES':
            let q = localStorage.getItem('friendName');
            let u = localStorage.getItem('username');
            let x = msg.data;
            x.sort((a: any, b: any) => (Date.parse(a.createAt) > Date.parse(b.createAt)) ? 1 : ((Date.parse(b.createAt) > Date.parse(a.createAt)) ? -1 : 0));
            for (let i = 0; i < x.length; i++) {
              if ((x[i].name == q || x[i].name == u) && (x[i].to == q || x[i].to == u)) {
                if (x[i].name == q) {
                  this.createContentChatForPeopleFriend(x[i].mes);
                } else if (x[i].name == u) {
                  this.createContentChatForPeopleMain(x[i].mes);
                }
              }
            }
            break;
          default:
            break;
        }
      }, // Called whenever there is a message from the server.
      err => {
        console.log(err);
      }, // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
  closeConnect() {
    this.ws.complete();
  }
  checkLogin(status: string, mes: string) {
    if (status == "success") {
      let username = localStorage.getItem('username') as string;
      let password = localStorage.getItem('password') as string;
      let user: User = new User(username, password);
      this.userService.setCurrentUser(user);
      localStorage.removeItem('password');
      this.router.navigate(['main/chat', 1]);
    } else if (status == "error") {
      alert(mes);
    }
  }
  sendChatToPeople(friend: string, mess: string) {
    let data = {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "people",
          "to": friend,
          "mes": mess
        }
      }
    };
    this.ws.next(data);
  }
  sendChatToRoom(room: string, mess: string) {
    let data = {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "room",
          "to": room,
          "mes": mess
        }
      }
    };
    this.ws.next(data);
  }
  createContentChatForRoomChat(x: HTMLElement, w1: string, t: string) {
    let a = x.getElementsByClassName('content-left-body')[0];
    let z = document.createElement('div');
    z.classList.add('main-body');
    z.classList.add('incoming_group');
    let z1 = document.createElement('div');
    z1.classList.add('image');
    let z2 = document.createElement('img');
    z2.src = 'assets/image/linkka.jpg';
    z1.appendChild(z2)
    z.appendChild(z1);
    let z3 = document.createElement('div');
    z3.classList.add('content-chat');
    z.appendChild(z3);
    let zNew1 = document.createElement('div');
    zNew1.classList.add('people-name');
    zNew1.style.paddingLeft = '10px';
    let zNew2 = document.createElement('span');
    zNew2.innerHTML = w1;
    zNew1.appendChild(zNew2);
    z3.appendChild(zNew1);
    let z4 = document.createElement('div');
    z4.classList.add('row');
    let z5 = document.createElement('div');
    z5.classList.add('main-contain');
    let z6 = document.createElement('span');
    z6.innerHTML = t;
    z6.style.fontFamily = "'Times New Roman', Times, serif";
    z3.appendChild(z4);
    z4.appendChild(z5);
    z5.appendChild(z6);
    a.appendChild(z);
  }
  createContentChatForPeopleFriend(t: string) {
    let x = document.getElementById('main') as HTMLElement;
    let y = x.getElementsByClassName('main-body');
    let length = x.getElementsByClassName('main-body').length;
    if (length > 0) {
      let y1 = y[length - 1];
      if (y1.classList.contains('incoming_group')) {
        let y2 = y1.getElementsByClassName('content-chat')[0];
        let z = document.createElement('div');
        z.classList.add('row');
        let z1 = document.createElement('div');
        z1.classList.add('main-contain');
        let z2 = document.createElement('span');
        z2.innerHTML = t;
        z1.appendChild(z2);
        z.appendChild(z1);
        y2.appendChild(z);
      } else {
        let a = x.getElementsByClassName('content-left-body')[0];
        let z = document.createElement('div');
        z.classList.add('main-body');
        z.classList.add('incoming_group');
        let z1 = document.createElement('div');
        z1.classList.add('image');
        let z2 = document.createElement('img');
        z2.src = 'assets/image/linkka.jpg';
        z1.appendChild(z2)
        z.appendChild(z1);
        let z3 = document.createElement('div');
        z3.classList.add('content-chat');
        z.appendChild(z3);
        let z4 = document.createElement('div');
        z4.classList.add('row');
        let z5 = document.createElement('div');
        z5.classList.add('main-contain');
        let z6 = document.createElement('span');
        z6.innerHTML = t;
        z6.style.fontFamily = "'Times New Roman', Times, serif";
        z3.appendChild(z4);
        z4.appendChild(z5);
        z5.appendChild(z6);
        a.appendChild(z);
      }
    } else {
      let a = x.getElementsByClassName('content-left-body')[0];
      let z = document.createElement('div');
      z.classList.add('main-body');
      z.classList.add('incoming_group');
      let z1 = document.createElement('div');
      z1.classList.add('image');
      let z2 = document.createElement('img');
      z2.src = 'assets/image/linkka.jpg';
      z1.appendChild(z2)
      z.appendChild(z1);
      let z3 = document.createElement('div');
      z3.classList.add('content-chat');
      z.appendChild(z3);
      let z4 = document.createElement('div');
      z4.classList.add('row');
      let z5 = document.createElement('div');
      z5.classList.add('main-contain');
      let z6 = document.createElement('span');
      z6.innerHTML = t;
      z3.appendChild(z4);
      z4.appendChild(z5);
      z5.appendChild(z6);
      a.appendChild(z);
    }
  }
  createContentChatForPeopleMain(t: string) {
    let x = document.getElementsByClassName('content-left-body')[0];
    let length = x.getElementsByClassName('main-body').length;
    if (length > 0) {
      let y = x.getElementsByClassName('main-body');
      let y1 = y[length - 1];
      if (y1.classList.contains('outgoing_group')) {
        let q = document.createElement('div');
        q.classList.add('row');
        let q2 = document.createElement('div');
        q2.classList.add('main-contain');
        let q3 = document.createElement('span');
        q3.innerHTML = t;
        q2.appendChild(q3);
        q.appendChild(q2);
        y1.appendChild(q);
      } else {
        let q = document.createElement('div');
        q.classList.add('main-body');
        q.classList.add('outgoing_group');
        let q1 = document.createElement('div');
        q1.classList.add('row');
        let q2 = document.createElement('div');
        q2.classList.add('main-contain');
        let q3 = document.createElement('span');
        q3.innerHTML = t;
        q1.appendChild(q2);
        q2.appendChild(q3);
        q.appendChild(q1);
        x.appendChild(q);
      }
    } else {
      let q = document.createElement('div');
      q.classList.add('main-body');
      q.classList.add('outgoing_group');
      let q1 = document.createElement('div');
      q1.classList.add('row');
      let q2 = document.createElement('div');
      q2.classList.add('main-contain');
      let q3 = document.createElement('span');
      q3.innerHTML = t;
      q1.appendChild(q2);
      q2.appendChild(q3);
      q.appendChild(q1);
      x.appendChild(q);
    }
  }
}
