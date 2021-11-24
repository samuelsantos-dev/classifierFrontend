import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Utils from 'src/app/shared/utils/utils';
import { environment } from 'src/environments/environment';
import { DocumentDTO } from '../models/document-dto';
import { UserNewDTO } from '../models/user-new-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  insert(user: UserNewDTO){
    return this.http.post<UserNewDTO>(`${environment.api}/users`, user,
    {
      observe: 'body',
      responseType: 'json'
    });
  }

  insertDocument(id: number, document: DocumentDTO){
    const formData = Utils.toFormData(document);
    return this.http.post<DocumentDTO>(`${environment.api}/documents/${id}`, formData,
    {
      observe: 'body',
      responseType: 'json'
    });
  }

  
}
