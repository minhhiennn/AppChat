import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listChat } from '../Model/listchat';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListChatService {
  url: string = "http://first-fucking-app-angular.herokuapp.com/listchat";
  constructor(private http: HttpClient) { }
  getListFriend(): Observable<listChat[]> {
    return this.http.get<listChat[]>(this.url);
  }
  getFriendWithID(id: any): Observable<listChat> {
    return this.http.get<listChat>(this.url + "/" + id);
  }
}
