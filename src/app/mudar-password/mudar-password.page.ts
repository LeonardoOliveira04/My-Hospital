import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../fire-auth-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mudar-password',
  templateUrl: './mudar-password.page.html',
  styleUrls: ['./mudar-password.page.scss'],
})
export class MudarPasswordPage implements OnInit {

  email = '';

  constructor(
    private fireauthService: FireauthService,
    private alertController: AlertController
  ) {}

  async resetPassword() {
    try {
      await this.fireauthService.resetPassword(this.email);
      this.presentSuccessAlert();
    } catch (error) {
      this.presentFailureAlert(String(error));    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Successo',
      message: 'Foi-lhe enviado um email para alterar a password.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentFailureAlert(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
