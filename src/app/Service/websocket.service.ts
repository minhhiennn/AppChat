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
        let event = Object.values(msg)[0];
        switch (event) {
          case 'LOGIN':
            let status: string = Object.values(msg)[2] as string;
            let mes: string = Object.values(msg)[1] as string;
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
                let x = document.getElementById('main') as HTMLElement;
                let y = x.getElementsByClassName('main-body');
                let length = x.getElementsByClassName('main-body').length;
                if(length > 0) {
                  let y1 = y[length - 1];
                  if (y1.classList.contains('incoming_group')) {
                    let y2 = y1.getElementsByClassName('content-chat')[0];
                    let z = document.createElement('div');
                    z.classList.add('row');
                    let z1 = document.createElement('div');
                    z1.classList.add('main-contain');
                    z1.style.display = "inline-block";
                    z1.style.backgroundColor = "#e4e6eb";
                    z1.style.borderRadius = "18px";
                    z1.style.padding = "5px 12px 5px 12px";
                    z1.style.marginTop = "3px";
                    let z2 = document.createElement('span');
                    z2.style.fontFamily = "'Times New Roman', Times, serif";
                    z2.innerHTML = t;
                    z1.appendChild(z2);
                    z.appendChild(z1);
                    y2.appendChild(z);
                  } else {
                    let a = x.getElementsByClassName('content-left-body')[0];
                    let z = document.createElement('div');
                    z.classList.add('main-body');
                    z.classList.add('incoming_group');
                    z.style.display = 'flex';
                    z.style.position = 'relative';
                    z.style.width = '100%';
                    let z1 = document.createElement('div');
                    z1.classList.add('image');
                    let z2 = document.createElement('img');
                    z2.src = 'assets/image/linkka.jpg';
                    z2.style.borderRadius = '50%';
                    z2.style.width = '30px';
                    z2.style.height = '30px';
                    z2.style.position = 'absolute';
                    z2.style.bottom = '0';
                    z2.style.left = '2px';
                    z1.appendChild(z2)
                    z.appendChild(z1);
                    let z3 = document.createElement('div');
                    z3.classList.add('content-chat');
                    z3.style.paddingLeft = '36px';
                    z3.style.width = '98%';
                    z.appendChild(z3);
                    let z4 = document.createElement('div');
                    z4.classList.add('row');
                    let z5 = document.createElement('div');
                    z5.classList.add('main-contain');
                    z5.style.display = "inline-block";
                    z5.style.backgroundColor = "#e4e6eb";
                    z5.style.borderRadius = "18px";
                    z5.style.padding = "5px 12px 5px 12px";
                    z5.style.marginTop = "3px";
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
                  z.style.display = 'flex';
                  z.style.position = 'relative';
                  z.style.width = '100%';
                  let z1 = document.createElement('div');
                  z1.classList.add('image');
                  let z2 = document.createElement('img');
                  z2.src = 'assets/image/linkka.jpg';
                  z2.style.borderRadius = '50%';
                  z2.style.width = '30px';
                  z2.style.height = '30px';
                  z2.style.position = 'absolute';
                  z2.style.bottom = '0';
                  z2.style.left = '2px';
                  z1.appendChild(z2)
                  z.appendChild(z1);
                  let z3 = document.createElement('div');
                  z3.classList.add('content-chat');
                  z3.style.paddingLeft = '36px';
                  z3.style.width = '98%';
                  z.appendChild(z3);
                  let z4 = document.createElement('div');
                  z4.classList.add('row');
                  let z5 = document.createElement('div');
                  z5.classList.add('main-contain');
                  z5.style.display = "inline-block";
                  z5.style.backgroundColor = "#e4e6eb";
                  z5.style.borderRadius = "18px";
                  z5.style.padding = "5px 12px 5px 12px";
                  z5.style.marginTop = "3px";
                  let z6 = document.createElement('span');
                  z6.innerHTML = t;
                  z6.style.fontFamily = "'Times New Roman', Times, serif";
                  z3.appendChild(z4);
                  z4.appendChild(z5);
                  z5.appendChild(z6);
                  a.appendChild(z);
                }
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
                      z1.style.display = "inline-block";
                      z1.style.backgroundColor = "#e4e6eb";
                      z1.style.borderRadius = "18px";
                      z1.style.padding = "5px 12px 5px 12px";
                      z1.style.marginTop = "3px";
                      let z2 = document.createElement('span');
                      z2.style.fontFamily = "'Times New Roman', Times, serif";
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
                  this.createContentChatForRoomChat(x,w1,t);
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
      localStorage.removeItem('username');
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
    z.style.display = 'flex';
    z.style.position = 'relative';
    z.style.width = '100%';
    z.style.marginTop = '5px';
    let z1 = document.createElement('div');
    z1.classList.add('image');
    let z2 = document.createElement('img');
    z2.src = 'assets/image/linkka.jpg';
    z2.style.borderRadius = '50%';
    z2.style.width = '30px';
    z2.style.height = '30px';
    z2.style.position = 'absolute';
    z2.style.bottom = '0';
    z2.style.left = '2px';
    z1.appendChild(z2)
    z.appendChild(z1);
    let z3 = document.createElement('div');
    z3.classList.add('content-chat');
    z3.style.paddingLeft = '36px';
    z3.style.width = '98%';
    z.appendChild(z3);
    let zNew1 = document.createElement('div');
    zNew1.classList.add('people-name');
    zNew1.style.paddingLeft = '10px';
    let zNew2 = document.createElement('span');
    zNew2.style.fontSize = '14px';
    zNew2.style.color = '#65676b';
    zNew2.style.fontFamily = "'Times New Roman', Times, serif";
    zNew2.innerHTML = w1;
    zNew1.appendChild(zNew2);
    z3.appendChild(zNew1);
    let z4 = document.createElement('div');
    z4.classList.add('row');
    let z5 = document.createElement('div');
    z5.classList.add('main-contain');
    z5.style.display = "inline-block";
    z5.style.backgroundColor = "#e4e6eb";
    z5.style.borderRadius = "18px";
    z5.style.padding = "5px 12px 5px 12px";
    z5.style.marginTop = "3px";
    let z6 = document.createElement('span');
    z6.innerHTML = t;
    z6.style.fontFamily = "'Times New Roman', Times, serif";
    z3.appendChild(z4);
    z4.appendChild(z5);
    z5.appendChild(z6);
    a.appendChild(z);
  }
}
