import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Product } from '../model/Product.model';
@Injectable({
  providedIn: 'root'
})
export class CatelogueService {

public host:string="http://localhost:8888"
  constructor(private httpClient:HttpClient) { }

  public getResource(url){
  return this.httpClient.get(this.host+url);

  }

  public getProduct(url):Observable<Product>{
  return this.httpClient.get<Product>(url);

  }
   uploaddocument

  uploadPhotoProduct(file:File,idProduct):Observable<HttpEvent<{}>>{
  let formdata: FormData=new FormData();
  formdata.append('file',file);
  const req=new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formdata,{
  reportProgress:true,
  responseType:'text'});
  return this.httpClient.request(req);
  }

  uploaddocu(file:File,iddoc):Observable<HttpEvent<{}>>{
  let formdata: FormData=new FormData();
  formdata.append('file',file);
  const req=new HttpRequest('POST',this.host+'/uploaddocument/'+iddoc,formdata,{
  reportProgress:true,
  responseType:'text'});
  return this.httpClient.request(req);
  }


  public patchResource(url,data){
  return this.httpClient.patch(url,data);

  }

}