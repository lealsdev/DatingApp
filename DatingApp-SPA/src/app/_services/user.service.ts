import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>>{
    // return this.http.get<User[]>(this.baseurl + 'users', this.httpOptions);
    //return this.http.get<User[]>(this.baseurl + 'users');

    console.log(userParams.userId);

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams.userId) {
      params = params.append('userId', userParams.userId);
    }

    if (userParams.minAge) {
      params = params.append('minAge', userParams.minAge);
    }

    if (userParams.maxAge) {
      params = params.append('maxAge', userParams.maxAge);
    }

    if (userParams.gender) {
      params = params.append('gender', userParams.gender);
    }

    if (userParams.orderBy) {
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseurl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    // return this.http.get<User>(this.baseurl + 'users/' + id, this.httpOptions);
    return this.http.get<User>(this.baseurl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseurl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseurl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseurl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseurl + 'users/' + id + '/like/' + recipientId, {});
  }

}
