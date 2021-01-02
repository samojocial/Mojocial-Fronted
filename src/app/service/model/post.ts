import{Comment}from './comment';
export class Post {
public id:number | undefined;
public name:string | undefined;
public caption:string | undefined;
public postedDate:Date |undefined;
public username:string |undefined;
public location:string |undefined;
public likes:number |undefined;
public commentList:Comment[] | undefined;
}
//undefined are used becoz the properties doesnot contain any initializer
//This Post class contain all the property like 
//id ,name ,caption, date of post,username,location..etc
