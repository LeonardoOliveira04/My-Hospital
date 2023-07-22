import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NotificationsService } from '../notifications.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
const { Storage } = Plugins;

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
})
export class NotificacoesPage implements OnInit {
  consultaToggle!: boolean;
  consultaDuration!: number;
  triagemToggle!: boolean;
  triagemDuration!: number;

  changesMade: boolean = false;


  constructor(private notificationService: NotificationsService,private alertController: AlertController, private router:Router) { }

  ngOnInit() {
    this.loadSettings();
  }

  updateChangesMade() {
    console.log("mudou");
    this.changesMade = true;
  }

  saveSettings() {
    // Save the settings using the notification service
    this.notificationService.saveSettings({
      consultaToggle: this.consultaToggle,
      consultaDuration: this.consultaDuration,
      triagemToggle: this.triagemToggle,
      triagemDuration: this.triagemDuration,
    });
    this.changesMade = false;
  }

  loadSettings() {
    const settings = this.notificationService.loadSettings();
    this.consultaToggle = settings.consultaToggle;
    this.consultaDuration = settings.consultaDuration;
    this.triagemToggle = settings.triagemToggle;
    this.triagemDuration = settings.triagemDuration;
  }

  async presentAlertLostProgress() {
    if (this.changesMade) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'De certeza que deseja sair? O progresso será perdido',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(["tabs/tab3"]);
              console.log('User confirmed to leave');
            }
          }
        ]
      });

      await alert.present();
    }
    else{
      this.router.navigate(["tabs/tab3"]);
    }
  }
}
