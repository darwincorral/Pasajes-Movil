import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  iniciar = true;
  saldo = null;
  mostrarSaldo=null;
  transporte = JSON.parse(localStorage.getItem('infoUsuario'));
  
 
  constructor(
    private barcodeScanner: BarcodeScanner,
    private _service:ServicesService,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    ) {}

  ionViewDidEnter(){
    this.iniciar = true;
    this.saldo = null;
  }

  simularPago(){
    this._service.saveCobro('0001',this.transporte.idTransporte,this.transporte.usuario).subscribe((resp:any)=>{
      if(resp.codRetorno=='0001'){
        this.saldo = true;
        this.mostrarSaldo = resp.retorno;
        this.reproducirSonido(true);
      }else{
        this.saldo = false;
        this.mostrarSaldo = null;
        this.reproducirSonido(false);
      }
    }),error=>{
      this.saldo = false;
      this.mostrarSaldo = null;
      this.reproducirSonido(false);
    }
  }

  iniciarRuta(){
    this.iniciar = false;
    this.scan();
   //this.simularPago();
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled){
        let text = barcodeData.text.substr(0,4);
        if(text =='http'||text =='geo:'){
          this.saldo = false;
          this.mostrarSaldo = null;
          this.reproducirSonido(false);
        }else{
        this._service.saveCobro(barcodeData.text,this.transporte.idTransporte,this.transporte.usuario).subscribe((resp:any)=>{
          if(resp.codRetorno=='0001'){
            this.saldo = true;
            this.mostrarSaldo = resp.retorno;
            this.reproducirSonido(true);
          }else{
            this.saldo = false;
            this.mostrarSaldo = null;
            this.reproducirSonido(false);
          }
        }),error=>{
          this.saldo = false;
          this.mostrarSaldo = null;
          this.reproducirSonido(false);
          }
        }
      }else{
        this.iniciar = true;
        this.saldo = null;
        this.mostrarSaldo = null;
      } 
     }).catch(err => {
         console.log('Error', err);
         this.iniciar = true;
         this.saldo = null;
         this.mostrarSaldo = null;
     });
  }

  reproducirSonido (estado) {
    let audio = new Audio();
    audio.src = estado?'assets/sonidos/CONSALDO.mp3':'assets/sonidos/SINSALDO.mp3';
    audio.load();
    audio.play();
    setTimeout(() => {
      this.iniciar = true;
      this.scan();
    }, 2 * 1000);
  }

    async cerrarSession(){
        const actionSheet = await this.actionSheetController.create({
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
  
}
