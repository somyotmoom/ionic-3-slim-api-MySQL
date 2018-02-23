import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService: ApiServiceProvider,public alerCtrl: AlertController) {
    this.getUser(); // เรียกใช้ฟังก์ชัน getUser ทำงาน
  }

  // ตัวแปรเก็บข้อมูลสมาชิก
  public resposeData: any;  
  // กำหนดให้ user_id มีค่าเท่าค่า ref_user_id ที่ส่งมาจากหน้าสมาชิก ใช้สำหรับค้นหา
  userPostData = {user_id : this.navParams.get('ref_user_id')}; // ตัวแปรให้ค้นหาสมาชิก
  getUser(){ // ฟังก์ชันค้นหาข้อมูลสมาชิก
    this.authService.postData(this.userPostData, "getUser").then(result => {
        this.resposeData = result;
        if (this.resposeData.userData) {
          this.userData.name=this.resposeData.userData.name; // กำหนดให้ช่องชื่อ-สกุล มีค่าเท่ากับข้อมูลสมาชิกที่ค้นหา
          this.userData.email=this.resposeData.userData.email; // กำหนดให้ช่อง email มีค่าเท่ากับข้อมูลสมาชิกที่ค้นหา
          console.log(this.resposeData.userData.name); // log ข้อมูลดูเวลาดีบักโปรแกรมใน google chrome
        }else{
        console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  // ตัวแปรสำหรับแก้ไขข้อมูล
  userData = {"user_id":this.navParams.get('ref_user_id'),"name": "","email": ""};
  update(){ // ฟังก์ชันแก้ไขข้อมูล
      this.authService.postData(this.userData,'update').then((result) => { // เรียกใช้ฟังก์ชัน update ของ api
         // แสดงข้อความแจ้งเมื่อบันทึกข้อมูลสำเร็จ
          let alert = this.alerCtrl.create({
            title: 'สำเร็จ',
            message: 'บันทึกข้อมูลสำเร็จ',
            buttons: ['Ok']
          });
          alert.present()
          this.navCtrl.setRoot(UserPage); // กลับหน้าสมาชิกทั้งหมด
  
      }, (err) => {
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}
