import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'appllication/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

 public loginService(data:any):Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.endpoint + '/api/login' , data, this.httpOptions)
  }

 public registerService(data:any): Observable<any>{
    return this.http.post<any>(environment.endpoint + '/api/register', data, this.httpOptions)
  }

  public getToken(){
    const accessToken = localStorage.getItem('access_token');
    if (accessToken){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      return decodedToken;
    }
  }

  public isAuthenticated():boolean {
    const token:any = localStorage.getItem('access_token');
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(token);
  }

  public isAdmin():boolean {
    const token:any = localStorage.getItem('admin_token');
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem('acces_token');
    localStorage.removeItem('admin_token');
    this.router.navigate(['/'])
  }

}
