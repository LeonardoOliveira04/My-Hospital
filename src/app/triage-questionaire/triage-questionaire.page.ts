import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QrserviceService } from '../qrservice.service';

@Component({
  selector: 'app-triage-questionaire',
  templateUrl: './triage-questionaire.page.html',
  styleUrls: ['./triage-questionaire.page.scss'],
})
export class TriageQuestionairePage implements OnInit {

  background:string[] = [];
  symptoms:string[] = [];
  pain_locale:string[] = [];
  currentFood:any = '0';
  pain_frequency:any = '0';
  pain_radiation:any = '0';
  positioning:any = '0';
  ambulation:any = '0';
  temperature: any = '0';
  pain_level: any = '0';
  dificulty_level: any = '0';
  symptoms_duration:any = '0';
  frequency_level:any = '0';

  constructor(private router:Router, private alertController: AlertController, private qrService: QrserviceService) {
    if(this.background.length == 0) this.background.push("diabetes");
    if(this.symptoms.length == 0) this.symptoms.push("dificuldade respiratoria");
    if(this.pain_locale.length == 0) this.pain_locale.push("cabeça");
    //this.pain_frequency = "intermitente";
    //this.pain_radiation = "erradia_não";
   }

  ngOnInit() {
  }

  
  validatePainLevel(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validateDificultyLevel(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validatePainFrequency(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validatePainRadiation(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validatePainPositioning(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validatePainAmbulation(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  validateSymptomsDuration(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  handleChangeSymptoms(ev:any) {
    this.symptoms = ev.target.value;
    if(this.symptoms.length == 0) {
      this.presentAlertNoChoiceSymptoms();
      this.symptoms.push("dificuldade respiratoria");
    }
  }

  handleChangeBackground(ev:any) {
    this.background = ev.target.value;
    if(this.background.length == 0) this.background.push("nenhum dos anteriores");
  }

  handleChangePainLocale(ev:any) {
    this.pain_locale = ev.target.value;
    if(this.pain_locale.length == 0) {
      this.presentAlertNoChoicePainLocale();
      this.pain_locale.push("cabeça");
    }
  }

  pinFormatter(value: number) {
    return `${value}`;
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

  validateFrequencyLevel(event:any){
    console.log('Selected value: ', this.pain_level);
  }

  async presentAlertNoChoice() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Responda a todas as perguntas antes de submeter!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertNoChoiceSymptoms() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Indique quais os sintomas que identifica!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertNoChoicePainLocale() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Indique onde sente dor!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  confirmAnswers(){
    let advance = true;
    if(this.symptoms.includes("dificuldade respiratoria")){
      if(this.dificulty_level == '0' || this.frequency_level == '0' || this.symptoms_duration == '0'){
        advance = false;
        this.presentAlertNoChoice();
      }
    }
    else if(this.symptoms.includes("dor")){
      if(this.pain_locale.length == 0 || this.pain_frequency == '0' || this.pain_radiation == '0' || this.positioning == '0' || this.ambulation == '0' || this.pain_level == '0'){
        advance = false;
        this.presentAlertNoChoice();
      }
    }
    else if(this.symptoms.includes("febre")){
      if(this.temperature == '0' || this.frequency_level == '0' || this.symptoms_duration == '0'){
        advance = false;
        this.presentAlertNoChoice();
      }
    }
    else{
      if(this.frequency_level == '0' || this.symptoms_duration == '0'){
        advance = false;
        this.presentAlertNoChoice();
      }
    }
    if(advance){
      this.qrService.saveData(this.background,this.symptoms,this.pain_locale,this.pain_frequency,this.pain_radiation,this.positioning,this.ambulation,this.temperature,this.pain_level,this.dificulty_level,this.symptoms_duration);
      this.router.navigate(["/qrcode/"+this.background+"/"+this.symptoms+"/"+this.pain_locale+"/"+this.pain_frequency+"/"+this.pain_radiation+"/"+this.positioning+"/"+this.ambulation+"/"+this.temperature+"/"+this.pain_level+"/"+this.dificulty_level+"/"+this.symptoms_duration]);
    }
  }
}
