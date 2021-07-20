import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  setCurrentUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));

  }
  getCurrentUser(): User | null {
    let object: any = localStorage.getItem("currentUser");
    let object2 = JSON.parse(object as any) as User;
    if (object != null) {
      return object2;
    }
    return null;
  }
  //logOutCurrentUser() {
  //  localStorage.removeItem("currentUser");
  //  this.router.navigate(['/login']);
  //}
}
