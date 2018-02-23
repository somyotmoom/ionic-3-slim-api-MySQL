import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// นำเข้าหน้า signup
import { SignupPage } from '../signup/signup';
// นำเข้าหน้า login
import { LoginPage } from '../login/login';
// นำเข้าหน้า user
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userDetails: any;
  constructor(public navCtrl: NavController) {
  //const data = JSON.parse(localStorage.getItem("userData"));
  //this.userDetails = data.userData;
  }

  //ฟังก์ชันไปหน้าลงทะเบียน แบบมีปุ่มย้อนกลับ
  signup(){
    this.navCtrl.push(SignupPage);
  }
  // ฟังก์ชันไปหน้าเข้าสู่ระบบ
  login(){
    this.navCtrl.push(LoginPage);
  }
  // ฟังก์ชันไปหน้าแสดงข้อมูลสมาชิกทั้งหมด
  user(){
    this.navCtrl.push(UserPage);
  }

}

