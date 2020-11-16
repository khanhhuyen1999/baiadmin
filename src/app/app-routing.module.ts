import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SanphamComponent } from './sanpham/sanpham.component';
import { LoaiSPComponent } from './loai-sp/loai-sp.component';
import { NccComponent } from './ncc/ncc.component';

const routes: Routes = [
  {path:'',component:SanphamComponent},
  {path:'loai-sp',component:LoaiSPComponent},
  {path:'nha-cung-cap',component:NccComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
