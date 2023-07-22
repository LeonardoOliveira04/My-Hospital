import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.page.html',
  styleUrls: ['./timeslot.page.scss'],
})
export class TimeslotPage implements OnInit {
  slot:any;

  constructor(public router:Router, private activatedRoute:ActivatedRoute, private alertController: AlertController) { 
    this.slot = 0;
  }

  date:any;
  type:any;
  notes:any;
  id:any;
  

  ngOnInit() {
    this.date = this.activatedRoute.snapshot.paramMap.get('date');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.notes = this.activatedRoute.snapshot.paramMap.get('notes');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  confirmTimeSlot(){
    if (this.slot!=0) this.router.navigate(["/make-appointment/"+this.type+"/"+this.date+"/"+this.notes+"/"+this.slot+"/"+this.id]);
    else this.presentAlertNoChoice();
  }

  async presentAlertNoChoice() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Escolha um horário para a consulta',
      buttons: ['OK'],
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
