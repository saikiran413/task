import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
url="http://localhost:3000/"
  constructor(private http: HttpClient) { }

  Signup(user:any): Observable<any>{
  
   return this.http.post(this.url +'signup', user)
  }


  login(user:any):Observable<any>{
    return  this.http.post(this.url +'login', user)
  }


  getVideos(): Observable<any>{

    console.log(localStorage.getItem('token'))
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
console.log("headers",headers)
    return this.http.get(this.url + 'api/videos', { headers })
  }

  postVideos(body:any): Observable<any>{

    console.log(localStorage.getItem('token'))
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
console.log("headers",headers)
    return this.http.post(this.url + 'api/videos',body, { headers })
  }

  bookmarkVideosPost(time:any, id:number){

    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
console.log("headers",headers)
    return this.http.post(this.url + 'api/videos/bookmarks/' + id,{time},{ headers } )
  }

  getbookmarkVideos(id:number){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
console.log("headers",headers)
    return this.http.get(this.url + 'api/videos/bookmarks/' + id, { headers })
  }
}
