import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  changeTask(ele: HTMLElement) {
    this.removeActive();
    this.addActive(ele);
  }
  removeActive() {
    let x: HTMLElement = document.getElementById('main-task-bar') as HTMLElement;
    let child: HTMLCollection = x.getElementsByTagName('div');
    for (let i in child) {
      if (child[i].classList.contains('active')) {
        child[i].classList.remove('active');
        break;
      }
    }
  }
  addActive(ele: HTMLElement) {
    ele.classList.add('active');
  }
}
