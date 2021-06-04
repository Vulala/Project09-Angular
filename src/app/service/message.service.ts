import { Injectable } from '@angular/core';

/** Service used to show message, mainly used for log purpose. */
@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
