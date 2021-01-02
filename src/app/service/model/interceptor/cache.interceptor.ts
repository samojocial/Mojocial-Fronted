/* Cache interceptor is an intercepter that is going to intercept the request that we are going to sending t the API all we have to check to make sure that we dont have the cache response request .If we do have the cache response the request wont be sent to the API it will just 
return that response to the user if we dont have the response in the cache so we will pass along the request to the API
Interceptor are used to manipulate the request going in and out in our application and you can make changes to the request where ever you want*/
import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor, //some iportant class to e import
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CacheService } from 'src/app/service/cache.service';
import {AccountService} from 'src/app/service/account.service';
import {ServerConstant} from 'src/app/constant/server-constant';
import { IfStmt, NotExpr } from '@angular/compiler';


@Injectable()
export class CacheInterceptor implements HttpInterceptor{
    constant:ServerConstant =new ServerConstant();
    private host:string = this.constant.host;
    constructor(private accountService:AccountService,private cacheService:CacheService){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{       //An interceptor is technically going to to be a service
    
        if (req.method !== 'GET') {
            this.cacheService.clearCache();
            return next.handle(req);
        }
         
        if (req.url.includes(`${this.accountService.host}/user/resetPassword`)){
            return next.handle(req);
        }
        if (req.url.includes(`${this.accountService.host}/user/register`)){
            return next.handle(req);
        }
        
        if (req.url.includes(`${this.accountService.host}/user/login`)){
            return next.handle(req);
        }

        if (req.url.includes(`${this.accountService.host}/user/findByUsername/`)){ //when user is serching any user by its name then ths service will find the user by ts name

            return next.handle(req);
        }

       const cachedResponse : HttpResponse<any>= this.cacheService .getCache(req.url);
       if(cachedResponse){
           return of (cachedResponse);
       }
     return next.handle(req)
     .pipe(tap(event =>{
         if(event instanceof HttpResponse){
         this.cacheService.cacheRequest(req.url, event);
     }})); //with pipe operator we can extend the observable and tap to the actual values of the operator
     /*once i know that i dont have the actual cache response and i know that i nedd to have this cache request in case the useer asked it later so here i will along the request and through pipe i am extending the observable
    and the tap will return an evant and in that event will be the http response ( if an event is the instanceof the httpresponse then it will be cached)*/
    
    }



}
    


