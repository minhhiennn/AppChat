import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../Model/friend';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FriendlistService {
  url: string = "http://first-fucking-app-angular.herokuapp.com/listfriend";
  constructor(private http: HttpClient) { }
  getListFriend(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.url);
  }
  getFriendWithID(id: any): Observable<Friend> {
    return this.http.get<Friend>(this.url + "/" + id);
  }
}
