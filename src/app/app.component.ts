import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(environment.colorStatusBar==null){
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString('#f0f0f0');
      }else{
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#eb445a');
      }
     this.splashScreen.hide();
    });
  }
}
