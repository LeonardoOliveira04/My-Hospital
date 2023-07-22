import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fire-service.service';
import { Appointment } from '../Appointment';
import { Console } from 'console';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {

  notes:any;

  type:any;

  dateToSave:any;

  constructor(public router:Router, private activatedRoute:ActivatedRoute, private alertController: AlertController, private service: FireserviceService) {
   }

  public myDate: String | undefined;


  slot:any;

  minDate: any = new Date().toISOString();

  id:any;

  

  ngOnInit() {
    this.slot = this.activatedRoute.snapshot.paramMap.get('slot');
    this.dateToSave = this.activatedRoute.snapshot.paramMap.get('date');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.notes = this.activatedRoute.snapshot.paramMap.get('notes');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.notes == '0') this.notes = "";
    if(this.type=='0') this.type = "clinica geral";
    if(this.dateToSave !='0'){
      this.myDate = this.convertToISOFormat(this.dateToSave);
    }
    else{this.myDate = this.minDate}
  }

  convertToISOFormat(dateString: string): string {
    const parts = dateString.split('-');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }

  async selectHours(){
    let date = this.myDate?.split("-");
    let year = date![0];
    let month = date![1];
    let day = date![2].split("T")[0];

    this.dateToSave = day+ "-" + month + "-"+ year;

    console.log("Data",this.dateToSave);
    this.router.navigate(["/timeslot/"+this.type+"/"+this.dateToSave+"/"+(this.notes+" ")+"/"+ this.id]);
  }

  confirmAppointment() {
    if (this.slot === '0' || this.dateToSave === '0') {
      this.presentAlertNoChoice();
    } else {
      let appointment = new Appointment();
      console.log("Date:" + this.dateToSave);
      console.log("Type:" + this.type);
      console.log("Notes:" + this.notes);
      console.log("Slot:" + this.slot);
      appointment.date = this.dateToSave;
      appointment.type = this.type;
      let modifiedNotes = "";
      if (this.notes === "Ex.: Já não vou ao médico à muito tempo.") {
        modifiedNotes = "--Não foram oferecidas notas--";
      }
      else modifiedNotes = this.notes;
      appointment.notes = modifiedNotes;
      appointment.slot = this.slot;
  
      if (this.id !== "0") {
        this.presentAlertConfirmReschedule(appointment);
        
      } else {
        this.service.createAppointment(appointment).then(() => {
          // Appointment created successfully
          this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
        })
          .catch((error: any) => {
            // Handle the error
            console.log(error);
          });
      }
    }
  }
  

  async presentAlertNoChoice() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Escolha um horário para a consulta',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertLostProgress() {
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
            this.goToTab1();
            console.log('User confirmed to leave');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmReschedule(appointment:Appointment) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'De certeza que deseja remarcar a consulta?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.service.updateAppointment(this.id, appointment).then(() => {
              // Appointment updated successfully
              this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
            })
              .catch((error: any) => {
                // Handle the error
                console.log(error);
              });
            console.log('User confirmed to reschedule');
          }
        }
      ]
    });

    await alert.present();
  }

  goToTab1(){
    this.router.navigate(["/tabs/tab1"]);
  }

  goToTab2(){
    this.router.navigate(["/tabs/tab2"]);
  }

  goToTab3(){
    this.router.navigate(["/tabs/tab3"]);
  }

}
