//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import ไฟล์ดังนี้
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//ที่อยู่ API
let apiUrl = "http://localhost/php-slim-api-master/";

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

 // constructor(public http: HttpClient) {
  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }

   //สำหรับส่งข้อมูล
   postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
  // สิ้นสุด

}
