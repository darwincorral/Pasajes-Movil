import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _services: ServicesService){}
  canActivate(): Observable<boolean> | Promise<boolean>|boolean{
    environment.colorStatusBar =null;
    return this._services.estaLogueado();
  }
  
}
