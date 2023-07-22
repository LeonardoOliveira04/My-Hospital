import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private name: string | undefined;
  private nsaude: string | undefined;
  private ncidadao: string | undefined;

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setNSaude(nsaude: string) {
    this.nsaude = nsaude;
  }

  getNSaude() {
    return this.nsaude;
  }

  setNCidadao(ncidadao: string) {
    this.ncidadao = ncidadao;
  }

  getNCidadao() {
    return this.ncidadao;
  }
}
