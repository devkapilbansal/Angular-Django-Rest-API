import { Component,OnInit } from '@angular/core';
import {UserService} from './user.service';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	
	public user: any;

	public new_user: any;

	constructor(public _userService:UserService){ }

	ngOnInit(){
		this.new_user = {};
		this.user = {
			username: '',
			email: '',
			password: ''
		};
	}

	login(){
		this._userService.login({'username':this.user.username,'email' :this.user.email,'password' : this.user.password});
	}

	logout(){
		this._userService.logout();
	}

	getUser(){
		this._userService.list(this.user.token);
	}

	createUser(){
		this._userService.create(this.new_user).subscribe(
			data => {
				this.getUser();
				return true;
			},
			error => {
				console.error('Error saving!');
				return throwError(error);
				}
		);
	}

}
