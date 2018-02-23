import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
// นำเข้าหน้าแรก
//import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  resposeData : any;  // ประกาศตัวแปรรับข้อมูล
  userData = {"username":"", "password":""}; // ตัวแปรสำหรับเข้าสู่ระบบ
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public authService: ApiServiceProvider,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.userData.username && this.userData.password){ // ต้องกรอกชื่อผู้ใช้และรหัสผ่าน
     // ส่งข้อมูลแบบ post เรียกใช้ฟังก์ชัน login ของ api slim
     this.authService.postData(this.userData, "login").then((result) =>{
     this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData

     if(this.resposeData.userData){ // ถ้าข้อมูลถูกต้อง
      localStorage.setItem('userData', JSON.stringify(this.resposeData))
      const data = JSON.parse(localStorage.getItem("userData"));
      this.presentToast("สวัสดี " + data.userData.name); // แสดงข้อมูลสมาชิก
      // this.navCtrl.setRoot(HomePage)
     }else{this.presentToast("โปรดระบุชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง");}
     }, (err) => {
       this.presentToast(err); // ถ้าเกิดข้อผิดพลาดให้แสดงข้อความ
     });
    }
    else{
     this.presentToast("ใส่ชื่อผู้ใช้และรหัสผ่าน");
    }
   }
   // ฟังก์ชัน Toast แจ้งเตือน
   presentToast(msg) {
     let toast = this.toastCtrl.create({
       message: msg,
       duration: 2000
     });
     toast.present();
   }
}

