import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
<<<<<<< HEAD
import { ChatComponent } from './Component/chat/chat.component';
import { ChatMessengerComponent } from './Component/taskbar/chat-messenger/chat-messenger.component';
=======
>>>>>>> 4f134b0c3ce1e05409b74e233c30dab7a08df0ad

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
<<<<<<< HEAD
    ChatComponent,
    ChatMessengerComponent,
=======
>>>>>>> 4f134b0c3ce1e05409b74e233c30dab7a08df0ad
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
