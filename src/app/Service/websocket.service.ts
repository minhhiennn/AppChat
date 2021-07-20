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
  data2 = {
    "action": "onchat",
    "data": {
      "event": "SEND_CHAT",
      "data": {
        "type": "people",
        "to": "teo1",
        "mes": "????????"
      }
    }
  };
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
      this.router.navigate(['/chat']);
    } else if (status == "error") {
      alert(mes);
    }
  }
}
