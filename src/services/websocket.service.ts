import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() { }
  res;
  public sendMessage(message):any {
 
  }

  close_connection(){
   
  }

}