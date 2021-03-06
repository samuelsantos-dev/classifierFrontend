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
      this.loader = true;
      this.userService.insertDocument(1, document).subscribe(resp => {
        this.toastr.success('Documento cadastrado')
        console.log(resp)
        this.documents.push(resp);
        this.loader = false
      }, () => this.loader = false)
    }
  }

  remove(document: DocumentDTO){
    this.documents.splice(this.documents.findIndex(x => x.id === document.id), 1);
  }
}
