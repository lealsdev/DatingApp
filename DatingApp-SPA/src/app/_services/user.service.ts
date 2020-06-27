import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;

  /*
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  */

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    // return this.http.get<User[]>(this.baseurl + 'users', this.httpOptions);
    return this.http.get<User[]>(this.baseurl + 'users');
  }

  getUser(id: number): Observable<User> {
    // return this.http.get<User>(this.baseurl + 'users/' + id, this.httpOptions);
    return this.http.get<User>(this.baseurl + 'users/' + id);
  }

}
