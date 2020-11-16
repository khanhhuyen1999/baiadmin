import { AfterViewInit, Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BaseComponent } from '../_lib/base.component';
import { AlertService } from '../_services/alert.service';
import { FileService } from '../_services/file.service';
import { LoaiSpService } from '../_services/loaisp.service';
import { SanPhamService } from '../_services/sanpham.service';
import { NccsService } from '../_services/ncc.service';
declare var $: any;

@Component({
  selector: 'app-ncc',
  templateUrl: './ncc.component.html',
  styleUrls: ['./ncc.component.css']
})
export class NccComponent extends BaseComponent implements OnInit,  AfterViewInit  {
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
    njector: Injector,
    private nccService: NccsService,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) {
    super(njector);
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      TenNcc: ['', Validators.required],
      DiaChi: ['', Validators.required],
      Sdt: ['', Validators.required],
    });

    this.onLoadAll();
  }
  
  get f() {
    return this.form.controls;
  }

  onLoadAll() {
    this.nccService.getPagination(this.page, this.pageSize).toPromise()
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
      TenNcc: '',
      DiaChi: '',
      Sdt: '',
    });
    this.openModal();
  }

  onEdit(item) {
    this.isCreate = false;

    this.id_update = item.maNcc;

    this.form.patchValue({
      TenNcc: item.tenNcc,
      DiaChi: item.diaChi,
      Sdt: item.sdt,
    });
    this.openModal();
  }

  onDelete(item) {
    this.alert.delete(() => {
      this.loading = true;
      this.nccService.delete(item.maNcc).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.success("Đã xóa NCC thành công!");
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
      MaNcc: this.id_update,
      TenNcc: this.form.value.TenNcc,
      DiaChi: this.form.value.DiaChi,
      Sdt: this.form.value.Sdt   
    };

    if(this.isCreate) {

      this.nccService.create(formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã thêm NCC thành công!");
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(err);
      });

    } else {

      this.nccService.update(this.id_update, formData).toPromise()
      .then(res => {
        this.loading = false;
        this.onLoadAll();
        this.closeModal();
        this.alert.success("Đã sửa NCC thành công!");
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
