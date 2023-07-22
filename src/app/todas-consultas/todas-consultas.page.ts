import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentWithId } from '../Appointment';
import { FireserviceService } from '../fire-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-todas-consultas',
  templateUrl: './todas-consultas.page.html',
  styleUrls: ['./todas-consultas.page.scss'],
})
export class TodasConsultasPage implements OnInit {

  appointments: AppointmentWithId[] = [];

  constructor(public router: Router, private service:FireserviceService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.service.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  addAppointment(){ 
    this.router.navigate(["/make-appointment/0/0/0/0/0"]);
  }

  remarcarConsulta(appointment:AppointmentWithId){
    this.router.navigate(["/make-appointment/"+appointment.type+"/"+appointment.date+"/"+appointment.notes+"/"+appointment.slot+"/"+appointment.id]);
  }

  cancelarConsulta(appointment:AppointmentWithId){
    this.presentAlertCancelAppointment(appointment.id);
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
