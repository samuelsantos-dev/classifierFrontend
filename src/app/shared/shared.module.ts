import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorProvider } from './services/error-interceptor';



@NgModule({
  entryComponents:[
   
  ],
  declarations: [
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({ progressBar: true }),
    BrowserAnimationsModule
  ], 
  exports:[
    CommonModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers:[
    ErrorInterceptorProvider
  ]
})
export class SharedModule { }
