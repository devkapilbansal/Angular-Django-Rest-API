import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable()
export class UserService {
    private httpOptions: any;
 
  // the actual JWT token
  public token: string;

  public pk: number;

  public first_name: string;

  public last_name: string;

  public photo: any;

  public email: string;

 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  create(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('http://localhost:8000/api/users/',data,{
    reportProgress: true,
    observe: 'events'
    }).pipe(
    catchError(this.errorMgmt));
  }

  public login(user) {
    console.log(user);
    console.log(JSON.stringify(user));
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post('/api/auth/login/', JSON.stringify(user),httpOptions).subscribe(
      data => {
        this.updateData(data['token'],data['user']['pk']);

      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  list(){
    let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
      };
      console.log(this.pk,this.token);
    return this.http.get('/api/users/'+this.pk,httpOptions).subscribe(
      data => {
        this.photoloader(data);
        console.log(data);
      }
    );
  }

  public logout() {
    this.http.post('/api/auth/logout/',this.httpOptions);
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token,pk) {
    this.token = token;
    this.pk = pk;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  private photoloader(data){
    this.username = data['username'];
    this.email = data['email'];
    this.photo = data['photo'];
    this.first_name=data['first_name'];
    this.last_name=data['last_name'];
  }

  errorMgmt(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage= error.error.message;
    }
    else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
