import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(loginData: { username: string; password: string }) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json',});
    return this.http.post<any>(`${environment.url_api}auth/login`, loginData, {headers}).pipe(map(response => {
      return response;
    }));
  }

  public signup(signupData: { username: string, email: string, password: string, repeatPassword: string }) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json',});
    return this.http.post<any>(`${environment.url_api}auth/signup`, signupData, {headers});
  }
}
