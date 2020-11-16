import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl + "sanphams/";

@Injectable({
  providedIn: 'root'
})

export class SanPhamService {
    constructor(
        private _http: HttpClient
    ) { }

    getAll() {
        return this._http
            .get<any>(baseUrl, { headers: environment.headerOptions });
    }

    getTheoLoai(idloai) {
        return this._http
            .get<any>(baseUrl + "get-loai/" + idloai, { headers: environment.headerOptions });
    }

    getTheoId(id) {
        return this._http
            .get<any>(baseUrl + id, { headers: environment.headerOptions });
    }

    getTimKiem(key) {
        let params = new HttpParams()
        .set("key", key);
        return this._http
            .get<any>(baseUrl + "tim-kiem", { params: params });
    }

    getPagination(page, pageSize) {
        let params = new HttpParams()
        .set('page', page)
        .set('pageSize', pageSize);
        
        return this._http
            .get<any>(baseUrl + "pagination", { headers: environment.headerOptions, params: params });
    }

    create(data) {
        return this._http
            .post(baseUrl, data);
    }

    update(id, data) {
        return this._http
            .put(baseUrl + id, data);
    }

    delete(id) {
        return this._http
            .delete(baseUrl + id);
    }
}