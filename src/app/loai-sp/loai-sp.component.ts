import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { LoaiSpService } from '../_services/loaisp.service';
import { SanPhamService } from '../_services/sanpham.service';
declare var $: any;

@Component({
  selector: 'app-loai-sp',
  templateUrl: './loai-sp.component.html',
  styleUrls: ['./loai-sp.component.css']
})
export class LoaiSPComponent extends BaseComponent  implements OnInit,  AfterViewInit {
  submitted: boolean;
  loading: boolean;
  isCreate: boolean;
  form: FormGroup;
  totalRecords: number;
  pageSize: number = 10;
  page: number = 1;
  id_update: any;
  data: any = [];

  constructor(
    injector: Injector,
    private loaispService: LoaiSpService,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      TenLoaiSP: ['', Validators.required],
      MoTa: ['', Validators.required],
    });

    this.onLoadAll();
  }
  
  get f() {
    return this.form.controls;
  }

  onLoadAll() {
    this.loaispService.getPagination(this.page, this.pageSize).toPromise()
    .then(res => {
      this.totalRecords = res.rowCount;
      this.data = res.results;
      
    })
    .catch(err => console.log(err));
  }

  onLoadPage(page) {
    this.page = page;
    this.onLoadAll();
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  onCreate() {
    this.isCreate = true;

    this.form.patchValue({
      TenLoaiSP: '',
      MoTa: '',
    });
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.maLoaiSp;

    this.form.patchValue({
      TenLoaiSP: item.tenLoaiSp,
      MoTa: item.moTa,
    });
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.loaispService.delete(item.maLoaiSp).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.success("Đã xóa loại sản phẩm thành công!");
        this.onLoadAll();
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });
    });
  }

   onSubmit() {
     this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let formData = {
      MaLoaiSp: this.id_update,
      TenLoaiSP: this.form.value.TenLoaiSP,
      MoTa: this.form.value.MoTa
    };

    if(this.isCreate) {

      this.loaispService.create(formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã thêm loại sản phẩm thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });

    } else {

      this.loaispService.update(this.id_update, formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã sửa loại sản phẩm thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });

    }
  }

  openModal() {
    this.submitted = false;
    $("#myModal").modal("show");
  }

  closeModal() {
    $("#myModal").modal("hide");
  }
}