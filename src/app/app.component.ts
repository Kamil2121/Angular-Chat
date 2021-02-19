import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Chat';
  chatPanel = false;
  loginPanel = true;
  nickname: string;

  ConnectChat(): void {
    this.loginPanel = false;
    this.chatPanel = true;
  }
}
