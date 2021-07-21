import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";

import { ChatComponent } from './Component/chat/chat.component';
import { FriendlistComponent } from './Component/friendlist/friendlist.component';
import { HomeComponent } from './Component/home/home.component';
import { SettingComponent } from './Component/setting/setting.component';
import { LoginComponent } from './Component/shared/login/login.component';
import { RegisterComponent } from './Component/shared/register/register.component';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
import { ChatbodyComponent } from './Component/chat/chatbody/chatbody.component';

const routes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'friendlist', component: FriendlistComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    ChatComponent,
    HomeComponent,
    FriendlistComponent,
    SettingComponent,
    LoginComponent,
    RegisterComponent,
    TaskbarComponent,
    ChatbodyComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
