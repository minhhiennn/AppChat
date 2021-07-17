import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
import { ChatComponent } from './Component/chat/chat.component';
import { ChatMessengerComponent } from './Component/taskbar/chat-messenger/chat-messenger.component';

<<<<<<< HEAD
const routes: Routes = [
  { path: "", component: TaskbarComponent },
  { path: "ChatComponent", component: ChatComponent },
  { path: "ChatMessengerComponent", component: ChatMessengerComponent },
];
=======
import { ChatComponent } from './Component/chat/chat.component';
import { FriendlistComponent } from './Component/friendlist/friendlist.component';
import { HomeComponent } from './Component/home/home.component';
import { SettingComponent } from './Component/setting/setting.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'friendlist', component: FriendlistComponent },
  { path: 'setting', component: SettingComponent },
  { path: '', component: ChatComponent }
];

>>>>>>> 4f134b0c3ce1e05409b74e233c30dab7a08df0ad
@NgModule({
  declarations: [
    ChatComponent,
    HomeComponent,
    FriendlistComponent,
    SettingComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
