import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { AppointmentWithId } from '../Appointment';
import { Router } from '@angular/router';
import { FireserviceService } from '../fire-service.service';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {
  @Input() appointment!: AppointmentWithId;

  constructor(private popoverController: PopoverController, private alertController: AlertController, private router:Router, private service:FireserviceService) {}

  ngOnInit() {}


  verLocalizacao(appointment: AppointmentWithId) {
    console.log('Ver localização for appointment:', appointment);
    this.popoverController.dismiss();
  }
  
  remarcar(appointment: AppointmentWithId) {
    this.router.navigate(["/make-appointment/"+appointment.type+"/"+appointment.date+"/"+appointment.notes+"/"+appointment.slot+"/"+appointment.id]);
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
