import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';//To make http call
import {Observable} from 'rxjs';//when we send push or get request to the API it going to retun observable
import { JwtHelperService } from '@auth0/angular-jwt';
import {User}from '../model/user';
import {PasswordChange} from '../model/password-change';
import{Post} from '../model/post';
import {ServerConstant} from '../constant/server-constant';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
constant:ServerConstant = new ServerConstant();//creating new object of serverconstant
public host:string = this.constant.host;//from here we are getting the localhost
  public token!: string; //token which will be a string
//token which will be a string
  public loggInUsername!: string; //To determine the username
//To determine the username
  public redirectURL!: string;
  private googleMapsAPIKey = 'Your google map API key';//to get the location to find from google api key
  private googleMapsAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlang=';
  private jwtHelper = new JwtHelperService();//jwt dependency
  showAlert: any;
  redirectUrl!: string;
  uploadeUserProfilePicture: any;




  constructor(private http:HttpClient) { } //instance of http created to communicate with API

login(user:User):Observable<HttpErrorResponse | HttpResponse<any>> {
return this.http.post<HttpErrorResponse | HttpResponse<any>>(`${this.host}/user/login`,user,{observe:'response'});//Login function

}
register(user:User):Observable<User |HttpErrorResponse>{
  return this.http.post<User>(`${this.host}/user/register`,user);//register function
}
resetPassword(email:string){
  return this.http.get(`${this.host}/user/resetPassword/${email}`,{
    responseType:'text'
  }) //resetPassword function which will return email of type string i this function i didnot use observable  bcoz i only want to return text to the API 
  //if user is successfull or if he fail (only text).So i have to tell the calling application or http client to expect the response type to be in text
}
logOut():void{
  this.token != null ;
  localStorage.removeItem('token');
} //logout function

saveToken(token:string):void{
  this.token =token;
  localStorage.setItem('token',token);//It will set the token
}
                                             //these are the function to manage token
loadToken():void{
  this.token
  localStorage.getItem('token');//it is not returning anything it only load token to the localhost of the userbrowser
}

getToken(token:string):any{
   return this.token;//gettoken will return the key=token
}

isLoggedIn():any    {
     this.loadToken();     
  if(this.token !=null && this.token !== ''){
    if(this.jwtHelper.decodeToken(this.token).sub !=null || ''){
    if(! this.jwtHelper.isTokenExpired(this.token)){
      this.loggInUsername =this.jwtHelper.decodeToken(this.token).sub; //This function will check the user is logged in or not
     return true;
    }
   }
  } else{
    this.logOut();
    return false;
  }
}
getUserInformation(username:string):Observable<User>{
  return this.http.get<User>(`${this.host}/user/${username}`);//This function return observable to the user
}
getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.host}/post/list`);
}//This post will not get any parameter and it will return an array of post and proceed an get request to the host

searchUsers(username:string):Observable<User[]>{
  return this.http.get<User[]>(`${this.host}/user/findByUsername/${username}`);
}//To search a list of user by secifing username it will take string which is username and it wiil return an observable of user array
//and proceed a get request to user to find username and pass the username in the actual url

getLocation(latitude:string,longitute:string):Observable<any>{
  return this.http.get<any>(`${this.googleMapsAPIUrl}`+`${latitude},${longitute}&key=${this.googleMapsAPIKey}`);
}//function to get location of the user which will take latitude and longitutde as a string and return observable any and get requst is send to the apiurl at the longitutde and latitude
//and specify the key which will be googlemap APIKey

updateUser(updateUser:User):Observable<User>{
  return this.http.post<User>(`${this.host}/user/update`,updateUser);
}//This function will take user an object of the application and it will return observable of user and return a post request to the host

changePassword(changePassword:PasswordChange){
  return this.http.post(`${this.host}/user/changePassword`,changePassword,{responseType :'text'})
}//this function will take string which will take password.this is taking password change object which is created inside model and this will return a post req to the user to change password 
// ans the return type will be string so responsetype:text

uploadUserProflePicture(profilePicture:File){
  const fd = new FormData();
  fd.append('image',profilePicture);
  return this.http
  .post(`${this.host}/user/photo/upload`,fd,{responseType:'text'})
   .subscribe(
     (response:any)=>{
       console.log(response);
       console.log('User Profile was Uploaded.'+response);
     },
     error=>{
       console.log(error);
     }//This function will take a frofile picture of type File.in this first i have to create forn data which will be like normal html form.Once the formdata have the profilepicture it will be sent to the api
     //and post request to be sent to the user and response type will be text
   );
}
}




