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
  reg1 = new RegExp('\\s'); // białe znaki
  reg4: boolean; // pusta wiadomość

  ConnectChat(): void {
    if (this.nickname === '') { this.reg4 = true; } else { this.reg4 = false; }
    if (this.reg1.test(this.nickname) || this.reg4) {}
    else {
      this.loginPanel = false;
      this.chatPanel = true;
    }
  }
}
