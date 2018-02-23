import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { EditPage } from '../edit/edit';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  //กำหนดตัวแปร
  public resposeData: any;
  public dataSet: any;
  userPostData = {user_id:""};

  constructor(public navCtrl: NavController,public authService: ApiServiceProvider,
    private alertCtrl: AlertController,) {
      this.getUser();
  }
  
  getUser(){
    this.authService.postData(this.userPostData, "userShow").then(result => {
        this.resposeData = result;
        if (this.resposeData.userData) {
          this.dataSet = this.resposeData.userData;
          console.log(this.dataSet);
        }else{
        console.log("No access");
        }
      },
      err => {
        //Connection failed message
      }
    );
  }

  userDelete(user_id, msgIndex) {
    let alert = this.alertCtrl.create({
      title: "ลบสมาชิก",
      message: "คุณต้องการลบสมาชิกใช่หรือไม่?",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "ลบ",
          handler: () => {
            this.userPostData.user_id = user_id;
            this.authService.postData(this.userPostData, "userDelete").then(result => {
            this.resposeData = result;
               if (this.resposeData.success) {
                  this.dataSet.splice(msgIndex, 1);
                } else {
                  console.log("No access");
              }
             },
             err => {
                //Connection failed message
                console.log(err);
             }
            );
          }
        }
      ]
    });
    alert.present();
  }

  userUpdate(user_id){
    // ไปยังหน้า eidt พร้อมส่งค่า user_id ไปด้วย
    this.navCtrl.push(EditPage,{ref_user_id:user_id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
