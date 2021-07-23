import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";

import { ChatComponent } from './Component/main/chat/chat.component';
import { FriendlistComponent } from './Component/main/friendlist/friendlist.component';
import { HomeComponent } from './Component/main/home/home.component';
import { SettingComponent } from './Component/main/setting/setting.component';
import { LoginComponent } from './Component/shared/login/login.component';
import { RegisterComponent } from './Component/shared/register/register.component';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
import { ChatbodyComponent } from './Component/main/chat/chatbody/chatbody.component';
import { MainComponent } from './Component/main/main.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'chat',
        component: ChatComponent,
        children: [
          { path: ':id', component: ChatbodyComponent},
        ]
      },
      { path: 'friendlist', component: FriendlistComponent },
      { path: 'setting', component: SettingComponent }
    ]
  },
  { path: '', component: LoginComponent },
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
    ChatbodyComponent,
    MainComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
