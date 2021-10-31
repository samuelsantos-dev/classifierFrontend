import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserNewDTO } from '../models/user-new-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  insert(user: UserNewDTO){
    return this.http.post<UserNewDTO>(`${environment.api}/users`, user,
    {
      observe: 'response',
      //responseType: 'text'
    });
  }
}
