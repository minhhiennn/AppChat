import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './Component/taskbar/taskbar.component';
import { ChatComponent } from './Component/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
