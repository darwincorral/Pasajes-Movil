import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient,
    private alertController:AlertController,
    private navCtrl: NavController, 
    ) { }

  getCobros(idTransporte){
    return this.http.get(environment.URL_SERVICIOS+'/viaje/findByBus/'+idTransporte);
  }

  saveCobro(idTarjeta,idTransporte,usuario){
    return this.http.get(environment.URL_SERVICIOS+'/tarjeta/pagarConTarjeta/'+idTarjeta+'/'+idTransporte+'/'+usuario);
  }

  login(user:string, pass:string){
    const data = {user,pass};
    return new Promise(resolve=>{
      let url = environment.URL_SERVICIOS  + '/transporte/login/';
      this.http.get(url+data.user+"/"+data.pass)
      .subscribe((resp:any)=>{
          if(resp.codRetorno=="0001"){
            this.guardarStorage(resp.retorno);
            resolve(true);
        }else{
          resolve(false);
        }
      },error=>{
        resolve(false);
      })
    });
  }


  guardarStorage(infoUsuario:any){
    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario));
  }


  async alertaInformativa(message:string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  estaLogueado(): Promise<boolean>{
    return new Promise(resolve =>{
      let usuario = localStorage.getItem('infoUsuario');
      if(usuario == null){
        resolve(true)
      }else{
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
        resolve(false)
      }
    })
   }

   verificarSesion(): Promise<boolean>{
    return new Promise(resolve =>{
      let usuario = localStorage.getItem('infoUsuario');
      if(usuario != null){
        resolve(true)
      }else{
        localStorage.removeItem('infoUsuario');
        this.navCtrl.navigateRoot('/login',{animated:true});
        resolve(false)
      }
    })
   }

      
   alertToastErrorMessage(message){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
    })
    
    Toast.fire({
      icon: 'error',
      title: message,
      //text:message
    })
  }


  alertToastSuccessMessage(message){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
    })
    
    Toast.fire({
      icon: 'success',
      title: message,
      //text:message
    })
  }
}
