import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
private request:any = {};

cacheRequest(requestUrl: string,response:HttpResponse<any>): void{
  this.request[requestUrl]=response;
}

getCache(requestUrl:string):HttpResponse<any> | null{ //This function will return httpresponse or null
return this.request[requestUrl];
}
invalidateCache(requestUrl: string):void{
  this.request[requestUrl] =null; //invalidating the cache using the url it will return url request or null

}
clearCache():void{//it will not except any thing  and eturn void
  this.request= {}; //this function is to clear cache it will reset the object literal and reinitialize the empty object literal 
}

}
