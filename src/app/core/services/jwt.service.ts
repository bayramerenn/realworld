import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private storageName:string = 'jwtToken';

  getToken():string | null{
    return localStorage.getItem(this.storageName);
  }
  saveToken(token:string){
    localStorage.setItem(this.storageName,token)
  }
  destroyToken(){
    localStorage.removeItem(this.storageName);
  }
}
