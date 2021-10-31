import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[
    UserService
  ]
})
export class UsersModule { }
