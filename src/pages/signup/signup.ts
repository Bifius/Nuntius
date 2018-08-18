import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

import { TabsPage } from '../tabs/tabs';
import { Login } from "../login/login";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({ selector: 'page-signup', templateUrl: 'signup.html' })
export class Signup {
  resposeData: any;
  userData = { "username": "", "password": "" };
  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if (this.userData.username && this.userData.password) {
      //Api connections
      this.authService.postData(this.userData, "signup").then((result) => {
        this.resposeData = result;
        if (this.resposeData.userData) {
          localStorage.setItem('userData', JSON.stringify(this.resposeData))
          this.navCtrl.push(TabsPage);
        }
        else {
          this.presentToast("A MySQL error occurred");
        }

      }, (err) => {
        //Connection failed message
      });
    }
    else {
      console.log("Give valid information.");
    }

  }

  login() {
    this.navCtrl.push(Login);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
