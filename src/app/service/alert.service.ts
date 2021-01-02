import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertType } from '../enum/alert-type.enum';
import{Alert} from './model/alert'; 


@Injectable({
  providedIn: 'root'
})
export class AlertService {

 public alerts : Subject<Alert> = new Subject();   //subject is like observable but you can send multikind message to broadcast message
 //When you have observable you have one observer listening to the observale but with a subject you can have multiple observable
 //and you can broadcast your messages to the multiple observable
  constructor() { }
  showAlert(message:string,alertType:AlertType): void{
     const alert = new Alert(message,alertType);
     this.alerts.next(alert);//ceating a new alert and passing the subject so that we can broadcast the message
   //They can send the mesaaage to the multiple listener everytime we call it will broadcast
  }


}
