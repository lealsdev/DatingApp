import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    {
      value: 'female',
      display: 'Females'
    },
    {
      value: 'male',
      display: 'Males'
    }
  ];
  userParams: any = {};
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    console.log(this.user.gender);
    this.userParams.gender = 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.userParams.userId = this.authService.currentUser.id;
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.userParams.userId = this.authService.currentUser.id;

    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

}
