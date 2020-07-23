import { Component,OnInit } from '@angular/core';
import {UserService} from './user.service';
import { FormBuilder,FormGroup } from "@angular/forms";
import {HttpClient, HttpHeaders,HttpEvent,HttpEventType} from '@angular/common/http';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	
	public user: any;

	username: string;

	progress: number=0;

	form: FormGroup;

	password: string;

	email: string;

	first_name: string;

	last_name: string;

	photo: File;

	constructor(public fb: FormBuilder, private http: HttpClient,public _userService:UserService){ 
		this.form=this.fb.group({
			username: [''],
			email: [''],
			first_name: [''],
			last_name: [''],
			password: [''],
			photo: [null]
		})
	}

	ngOnInit(){
		this.user = {
			username: '',
			email: '',
			password: ''
		};
	}

	photochange(event: any){
		const file=(event.target as HTMLInputElement).files[0];
		this.form.patchValue({
			photo: file
		});
		this.form.get('photo').updateValueAndValidity()
	}

	login(){
		this._userService.login({'username':this.user.username,'email' :this.user.email,'password' : this.user.password});
	}

	logout(){
		this._userService.logout();
	}
	createUser(){
		const uploadData = new FormData();
		uploadData.append('username',this.form.value.username);
		uploadData.append('email',this.form.value.email);
		uploadData.append('first_name',this.form.value.first_name);
		uploadData.append('last_name',this.form.value.last_name);
		uploadData.append('password',this.form.value.password);
		uploadData.append('photo',this.form.value.photo,this.form.value.photo.name);
		this._userService.create(uploadData).subscribe(
			(event: HttpEvent<any>) =>{
				switch(event.type){
					case HttpEventType.Sent:
					console.log('Request Made');
					break;
					case HttpEventType.ResponseHeader:
					console.log("ResponseHeader Received");
					break;
					case HttpEventType.UploadProgress:
					this.progress = Math.round(event.loaded/event.total * 100);
					console.log(`Uploaded ${this.progress}%`);
					break;
					case HttpEventType.Response:
					alert("check your email to activate your profile");
					console.log('User Created',event.body);
					setTimeout(() =>{
						this.progress=0;
					},1500);
				}
			},
			data => {
				alert("check your email to activate your profile");
				return true;
			}
		);
	}

}
