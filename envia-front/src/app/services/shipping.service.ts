import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) {
  }

  quoteShipping(shipmentData: any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + environment.tk_envia
      });
    return this.http.post<any>(`${environment.url_envia}ship/rate`, shipmentData, {headers});
  }

  createLabel(labelData: any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + environment.tk_envia
      });
    return this.http.post<any>(`${environment.url_envia}ship/generate`, labelData, {headers});
  }

  getState(): Observable<{ name: string, code_3_digits: string }[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + environment.tk_envia
    });
    return this.http.get<{
      data: { name: string, code_3_digits: string }[]
    }>(`${environment.url_queries}state?country_code=MX`, {headers}).pipe(
      map(response => response.data)
    );
  }

}
