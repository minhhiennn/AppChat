import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let x: string = this.router.url;
    let stringSplit = x.split('/');
    let y = document.getElementById(stringSplit[1]) as HTMLElement;
    y.classList.add('active');
  }
}
