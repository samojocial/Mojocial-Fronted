import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from 'src/app/service/account.service';
import { AlertService } from '../service/alert.service';
import {AlertType} from 'src/app/enum/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private accountService: AccountService , private alertService:AlertService,private router:Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.isLoggedIn(state.url);
  }
  private isLoggedIn(url:string):boolean {
    if(this.accountService.isLoggedIn()){
      return true;
    }
    this.accountService.redirectURL =url;
    this.router.navigate(['/login']);
    this.alertService.showAlert('You must be logged in to access the page',AlertType.DANGER);
    return false;
  }
}
