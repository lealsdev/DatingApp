import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {

        const userParams = {
            userId: this.authService.currentUser.id
        };

        console.log(userParams);

        return this.userService.getUsers(this.pageNumber, this.pageSize, userParams).pipe(
            catchError(error => {
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}