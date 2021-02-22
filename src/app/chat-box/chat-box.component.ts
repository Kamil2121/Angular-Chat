import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'https://mychat-angular.herokuapp.com';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  @Input() nickname: string;
  @ViewChild('messageList', {static: false}) myScrollContainer: ElementRef;
  scrollContainer: HTMLElement;
  socket: any;
  messageList: Array<MyMessage> = new Array();
  message: MyMessage = new MyMessage();
  contents: string;
  reg1 = new RegExp('\\s{2,}'); // podwójne znaki białe
  reg2 = new RegExp('^\\s'); // znaki białe na początku
  reg3 = new RegExp('\\s{2,}$'); // znaki białe na końcu
  reg4: boolean; // pusta wiadomość
  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  ngAfterViewChecked(): void {
    this.scrollToElement();
  }

  setupSocketConnection(): void {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: MyMessage) => {
      if (data) {
        this.messageList.push(data);
      }
    });
  }

  SendMessage(): void {
    if (this.contents === '') { this.reg4 = true; } else { this.reg4 = false; }
    if (this.reg1.test(this.contents) || this.reg2.test(this.contents) || this.reg3.test(this.contents) || this.reg4) {}
    else {
      this.message.nickname = this.nickname;
      this.message.contents = this.contents;
      this.socket.emit('message', this.message);
      this.contents = '';
    }
  }

  scrollToElement(): void {
    this.scrollContainer = document.getElementById('messageList');
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  }
}

export class MyMessage {
  nickname: string;
  contents: string;
}
