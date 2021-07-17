import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
import { ChatComponent } from './Component/chat/chat.component';
import { ChatMessengerComponent } from './Component/taskbar/chat-messenger/chat-messenger.component';

const routes: Routes = [
  { path: "", component: TaskbarComponent },
  { path: "ChatComponent", component: ChatComponent },
  { path: "ChatMessengerComponent", component: ChatMessengerComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
