import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
// นำเข้าหน้าแรก
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  //ตัวแปรส่งค่าบันทึกข้อมูล
  userData = {"username": "","password": "", "name": "","email": ""};
 
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public authService:ApiServiceProvider,public alerCtrl: AlertController,
    private toastCtrl:ToastController) {
  }
  
  signup(){
    if(this.userData.username && this.userData.password){  // เช็คการป้อนข้อมูล
      //ส่งค่า post เรียกใช้ฟังก์ชัน signup ของ slim framework
      this.authService.postData(this.userData,'signup').then((result) => {
        this.alert();  // แจ้งเตือนบันทึกสำเร็จ
      }, (err) => {
        this.presentToast(err);
      });
    }else{
      this.presentToast("โปรดระบุชื่อผู้ใช้และรหัสผ่าน");
    }
  }
  // แสดงข้อความเตือนถ้าไม่ป้อนข้อมูล
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  // แสดงข้อความแจ้งเมื่อบันทึกข้อมูลสำเร็จ
  alert(){
    let alert = this.alerCtrl.create({
      title: 'สำเร็จ',
      message: 'บันทึกข้อมูลสำเร็จ',
      buttons: ['Ok']
    });
    alert.present()
    this.navCtrl.setRoot(HomePage); // กลับหน้าแรก
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
}

