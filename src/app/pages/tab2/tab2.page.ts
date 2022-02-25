import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items = [1,1,1,1,1,1,1,1];
  cobros =[];
  transporte = JSON.parse(localStorage.getItem('infoUsuario'));
  constructor(
    private _service:ServicesService,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
  ) {}


  ionViewWillEnter(){
    this.cobros = [];
    this.items = [1,1,1,1,1,1,1,1];
    this.getCobros();
  }

  reload(event){
    setTimeout(() => {
      this.ionViewWillEnter();
    event.target.complete();
  }, 150);
  }


  getCobros(){
    this._service.getCobros(this.transporte.idTransporte).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.codRetorno == '0001'){
        if(resp.retorno.length==0){
          this.items = [];
        }else{
          console.log(resp.retorno);
          this.cobros = resp.retorno.reverse();
        }
      }else{
        this.items = [];
      }
    },error=>{
      this._service.alertaInformativa("Ocurrio un error al cargar los datos, intentelo nuevamente");
      this.items = [];
    });
  }


  async cerrarSession(){

    const actionSheet = await this.actionSheetController.create({
      //header: 'Albums',
      buttons: [{
        text: 'Cerrar Sesión',
        icon: 'log-out',
        handler: () => {
          localStorage.removeItem('infoUsuario');
          this.navCtrl.navigateRoot('/login',{animated:true});
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    await actionSheet.present();
  }

  getHour(date) {
    var myDate = new Date(date);
    var minutes = this.addZero(myDate.getMinutes());
    var hours = this.addZero(myDate.getHours());
    var seconds = this.addZero(myDate.getSeconds());
    let dato = hours + ":" + minutes + ":" + seconds;
    return dato
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
