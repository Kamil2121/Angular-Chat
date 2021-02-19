import { Component, Input, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://mychat-angular.herokuapp.com/';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @Input() nickname: string;
  socket: any;
  messageList: Array<MyMessage> = new Array();
  message: MyMessage = new MyMessage();
  // nickname = 'Kamil';
  contents: string;
  constructor() { }

  ngOnInit(): void {
    // this.message.contents = '';
    this.setupSocketConnection();
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
    this.message.nickname = this.nickname;
    this.message.contents = this.contents;
    // console.log(this.message);
    this.socket.emit('message', this.message);
    // this.messageList.push(this.message);
    this.contents = '';
  }

}

export class MyMessage {
  nickname: string;
  contents: string;
}
