import { Component, DestroyRef} from '@angular/core';

import { Router } from '@angular/router';
import { QrserviceService } from '../qrservice.service';
import { NavController, ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewWillEnter{

  checked = false;

  

  constructor(public router: Router, private qrService:QrserviceService) {
   
  }


  ionViewWillEnter(): void {
    const data = this.qrService.getData();
    console.log("qrcode", data);
    if (data != null) {
      this.router.navigate([
        "/qrcode/" + data.background + "/" + data.symptoms + "/" + data.pain_locale + "/" +
        data.pain_frequency + "/" + data.pain_radiation + "/" + data.positioning + "/" +
        data.ambulation + "/" + data.temperature + "/" + data.pain_level + "/" +
        data.dificulty_level + "/" + data.symptoms_duration
      ], {replaceUrl:true});
    }
  }



  goToQuestionaire(){
    if(this.checked) this.router.navigate(["/triage-questionaire"]);
  }

  checkValue(){
    this.checked = !this.checked;
    console.log(this.checked)
  }

}
