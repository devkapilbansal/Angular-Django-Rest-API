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

	public lo;

	username: string;

	password: string;

	email: string;

	first_name: string;

	last_name: string;

	photo: File;

	constructor(public _userService:UserService){ }

	ngOnInit(){
		this.user = {
			username: '',
			email: '',
			password: ''
		};
	}

	usernamechange(event: any){
		this.username=event.target.value;
	}

	passwordchange(event: any){
		this.password=event.target.value;
	}

	emailchange(event: any){
		this.email=event.target.value;
	}

	photochange(event: any){
		this.photo=event.target.files[0];
	}

	firstnamechange(event: any){
		this.first_name=event.target.value;
	}

	lastnamechange(event: any){
		this.last_name=event.target.value;
	}

	login(){
		this._userService.login({'username':this.user.username,'email' :this.user.email,'password' : this.user.password});
	}

	logout(){
		this._userService.logout();
	}

	getUser(){
		this._userService.list();
	}

	createUser(){
		const uploadData = new FormData();
		uploadData.append('username',this.username);
		uploadData.append('email',this.email);
		uploadData.append('first_name',this.first_name);
		uploadData.append('last_name',this.last_name);
		uploadData.append('password',this.password);
		uploadData.append('photo',this.photo,this.photo.name);
		this._userService.create(uploadData).subscribe(
			data => {
				alert("check your email to activate your profile");
				this.getUser();
				return true;
			},
			error => {
				console.error('Error saving!');
				console.log(error);
				return throwError(error);
				}
		);
	}

}
