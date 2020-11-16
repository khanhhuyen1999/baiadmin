import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { DautrangComponent } from './dautrang/dautrang.component';
import { CuoitrangComponent } from './cuoitrang/cuoitrang.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaiSPComponent } from './loai-sp/loai-sp.component';
import { NccComponent } from './ncc/ncc.component';


@NgModule({
  declarations: [
    AppComponent,
    SanphamComponent,
    DautrangComponent,
    CuoitrangComponent,
    LoaiSPComponent,
    NccComponent,
   
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShareModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
