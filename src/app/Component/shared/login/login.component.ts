import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/Service/websocket.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ws: WebsocketService) { }

  ngOnInit(): void {

  }
  login() {
    let eleusername: HTMLInputElement = document.getElementById('username') as HTMLInputElement;
    let elepassword: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    let username = eleusername.value;
    let password = elepassword.value;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    this.ws.LoginToServer(username, password);
  }
}
