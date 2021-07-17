import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
