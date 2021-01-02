import { Component,OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import{Alert} from 'src/app/service/model/alert';
import { AlertService } from './service/alert.service';
import { LoadingService } from './service/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
 private subscriptions:Subscription[]=[];
 public alerts:Alert[]=[];
 public loading :boolean;
 constructor(private loadingService:LoadingService,
  private alertService:AlertService){
    this.loading=false;
  }

  ngOnInit(){
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading=>{
        this.loading=isLoading;
      })
    );
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert=>{
        this.alerts.push(alert);
        this.closeAlert(3);
      })
    );
  }
 private closeAlert(second:number):void{
setTimeout(()=>{

  const element:HTMLElement=document.getElementById('dismissAlert')as HTMLElement;
  element.click();
},second * 1000);
  }
 
 ngOnDestroy(){
   this.subscriptions.forEach(sub=>sub.unsubscribe());
 }
}
