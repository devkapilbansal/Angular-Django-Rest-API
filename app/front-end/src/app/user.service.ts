import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class UserService {
    private httpOptions: any;
 
  // the actual JWT token
  public token: string;

  public pk: number;
 
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
    return this.http.post('http://localhost:8000/api/users/',data);
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

  public logout() {
    this.http.post('/api/auth/logout/',this.httpOptions);
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  list() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      })
    };
    return this.http.get('/api/users/${this.pk}/',httpOptions);
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
}