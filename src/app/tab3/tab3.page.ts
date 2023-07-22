import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FireauthService } from '../fire-auth-service.service';
import { FireserviceService } from '../fire-service.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
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
    private appService: FireserviceService
  ) {
    this.name = userService.getName();
    this.nsaude = userService.getNSaude();
    this.ncidadao = userService.getNCidadao();
  }

  ngOnInit(): void {
    this.appService.getImageUrl().subscribe((url: string | null) => {
      this.imageUrl = url || '../../assets/images/default-silhouette-image.png';
    });
  }

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
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }
  }
  
}
