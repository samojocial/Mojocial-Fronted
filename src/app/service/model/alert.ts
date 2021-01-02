import { AlertType } from "src/app/enum/alert-type.enum";

export class Alert {
    text!: string;
    type!: AlertType;   

   constructor(text: string,type =AlertType.SUCCESS){
       this.text = text;
       this.type = type;
   }

}