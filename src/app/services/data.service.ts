import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient,private authService:AuthService) { }
  getAll() {
    return this.http.get(this.url + '/api/books');
  }
  getById(id: string) {
    return this.http.get(this.url + '/api/books/' + id);
  }
  addFavoritesById(reviewId:string) {

      let token = this.authService.getToken();
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      });
      let userId=this.authService.currentUser.userId;
      return this.http.post(this.url + '/api/favorite/',{ userId:""+userId,reviewId:""+reviewId,update:true},{ headers: headers });
  }
  addReview(review:any) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.post(this.url + '/api/books/',
      { creatorId:""+userId,subtitle:review.subtitle,author:review.author,review:""+review.review,title:review.title,rating:review.rating,image:review.image},{ headers: headers });
  }
  GetFavoritesById() {
    let userId=this.authService.currentUser.userId;
    return this.http.get(this.url + '/api/favorite/'+userId);
  }
  PutNewName(name:string) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.put(this.url + '/api/username/',{id:userId,name:name},{headers:headers});
  }

  PutNewPassword(password: string) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.put(this.url + '/api/password/',{id:userId,password:password}, {headers:headers});

  }

  PutNewEmail(newEmail: string) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.put(this.url + '/api/email/',{id:userId,email:newEmail}, {headers:headers});
  }

  DeleteAccount() {
    let token = this.authService.getToken();

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.delete(this.url + '/api/user/'+userId, {headers:headers});

  }

  DeleteFavoritesById(id: string) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    let userId=this.authService.currentUser.userId;
    return this.http.delete(this.url + '/api/favorite/'+id+"/"+userId,{headers:headers});

  }
}
