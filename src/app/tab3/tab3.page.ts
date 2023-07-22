import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ViewDidEnter } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FireauthService } from '../fire-auth-service.service';
import { FireserviceService } from '../fire-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewDidEnter{
  public name: string | undefined;
  public nsaude: string | undefined;
  public ncidadao: string | undefined;
  public imageUrl: string | null = null;
  public uploadProgress: number | undefined;

  constructor(
    public nav: NavController,
    private userService: UserServiceService,
    private router: Router,
    private logService: FireauthService,
    private appService: FireserviceService,
    private platform: Platform,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.name = userService.getName();
    this.nsaude = userService.getNSaude();
    this.ncidadao = userService.getNCidadao();
  }
  ionViewDidEnter(): void {
    this.appService.getImageUrl().subscribe((url: string | null) => {
      this.imageUrl = url || '../../assets/images/default-silhouette-image.png';
    });  }

  goToContactos() {
    this.router.navigate(['/contactos']);
  }

  goToMudarPassword() {
    this.router.navigate(['/mudar-password']);
  }

  goToNotificacoes() {
    this.router.navigate(['/notificacoes']);
  }

  goToHelp() {
    //this.router.navigate(['/help']);
  }

  goToSobreNos() {
    //this.router.navigate(['/about']);
  }

  goToSair() {
    this.appService.unsubscribeOnLogOut();
    this.logService.logout();
    //this.logService.doLogout();
    this.router.navigate(['/login']);
  }


  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      const task = this.appService.uploadImage(file);
      task.then(() => {
        console.log('Image uploaded successfully.');

        // Navigate back to the "Perfil" page after image upload is complete
        this.navCtrl.navigateBack('/tabs/tab3');
      }).catch((error) => {
        console.error('Error uploading image:', error);

        // Navigate back to the "Perfil" page even if there's an error during upload
        this.navCtrl.navigateBack('/tabs/tab3');
      });
    }
  }
  
}
