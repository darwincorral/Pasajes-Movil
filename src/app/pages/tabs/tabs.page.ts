import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private statusBar: StatusBar,
  ) {}
 
  ngOnInit(){
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByHexString('#eb445a');
  }
}
