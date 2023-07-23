import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentWithId } from '../Appointment';
import { FireserviceService } from '../fire-service.service';
import { ActionSheetController, AlertController, PopoverController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  appointments: AppointmentWithId[] = [];
  nome:any;

  constructor(public router: Router, private service: FireserviceService, public popoverController: PopoverController, private alertController: AlertController, private actionSheetController: ActionSheetController, private uservice: UserServiceService) { 
    
  }
  ngOnInit(): void {
    this.nome = this.uservice.getName();
    this.getAppointments();
  }

  getAppointments() {
    this.service.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  addAppointment() {
    this.router.navigate(["/make-appointment/0/0/0/0/0"]);
  }

  navigateToAllConsultas() {
    this.router.navigate(["/todas-consultas"]);
  }



  async openMenu(event: any, appointment: AppointmentWithId) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [
        {
          text: 'Ver localização',
          handler: () => {
            this.verLocalizacao(appointment);
          }
        },
        {
          text: 'Remarcar Consulta',
          handler: () => {
            this.remarcar(appointment);
          }
        },
        {
          text: 'Cancelar Consulta',
          handler: () => {
            this.cancelar(appointment);
          }
        }
      ]
    });

    await actionSheet.present();
  }

  verLocalizacao(appointment: AppointmentWithId) {
    this.router.navigate(["/map/centro de saúde de rio de mouro"]);
    this.popoverController.dismiss();
  }

  remarcar(appointment: AppointmentWithId) {
    this.router.navigate(["/make-appointment/" + appointment.type + "/" + appointment.date + "/" + appointment.notes + "/" + appointment.slot + "/" + appointment.id]);
    this.popoverController.dismiss();
  }

  cancelar(appointment: AppointmentWithId) {
    this.presentAlertCancelAppointment(appointment.id);
    this.popoverController.dismiss();
  }

  async presentAlertCancelAppointment(id: any) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'De certeza que deseja cancelar a consulta?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.service.deleteAppointment(id);
            console.log('User confirmed to delete appointment');
            this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }


}
