import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true })
  
  slides: IonSlides;
  
  loginUser = {
    user: '',
    pass: '',
  };
  constructor(
    private loadingCtrl: LoadingController, 
    private _service: ServicesService,
    private navCtrl: NavController, 
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#f0f0f0');
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const loading = await this.loadingCtrl.create();
    loading.present();
    const valido = await this._service.login(this.loginUser.user, this.loginUser.pass);
    if (valido) {
      //ingresar app
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      loading.dismiss();
      
    }
    else {
      loading.dismiss();
      //usuario y contraseña incorrecto
      this._service.alertaInformativa("Usuario o contraseña no son correctos");
    }
  }

}
