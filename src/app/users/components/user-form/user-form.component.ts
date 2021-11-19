import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentDTO } from '../../models/document-dto';
import { UserNewDTO } from '../../models/user-new-dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  step = 0;
  documents: DocumentDTO[] = [];
  user: UserNewDTO= {
    name:'',
    cpf:'',
    email:'',
    password:'',
    confirmPassword:'',
  }

  loader = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  submit(){
    this.loader = true;
    this.userService.insert(this.user).subscribe(resp => {
      this.step++;
      this.user = resp;
      this.loader = false;
    }, ()=> {
      this.loader = false;
    })
  }

  getDocument(event: any) {
    const file: File = event.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/x-png'
        && file.type !== 'image/png' && file.type !== 'application/pdf') {
     this.toastr.error('Somente são permitidas imagens JPG / PNG e arquivos PDF')
    } else {
      const name = file.name;
      const extension = name.substring(name.lastIndexOf('.'));
      const document = {name: file.name, extension: extension, size: file.size, file: file}
      this.documents.push(document);
      this.loader = true;
      this.userService.insertDocument(this.user.id, document).subscribe(() => {
        this.toastr.success('Documento cadastrado')
        this.loader = false
      })
    }

    
  }
}
