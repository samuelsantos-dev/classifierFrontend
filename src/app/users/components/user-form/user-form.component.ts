import { Component, ViewChild, ViewChildren } from '@angular/core';
import { UserNewDTO } from '../../models/user-new-dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  user: UserNewDTO= {
    name:'',
    cpf:'',
    email:'',
    password:'',
    confirmPassword:'',
  }

  loader = false;

  constructor(private userService: UserService) { }

  submit(){
    this.loader = true;
    this.userService.insert(this.user).subscribe(resp => {
      this.loader = false;
      console.log(resp)
    }, ()=> {
      this.loader = false;
    })
  }
}
