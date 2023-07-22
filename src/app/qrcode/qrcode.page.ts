import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QrserviceService } from '../qrservice.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRCodePage implements OnInit{
  background: string[] = [];
  symptoms: string[] = [];
  pain_locale: string[] = [];
  pain_frequency: any = '0';
  pain_radiation: any = '0';
  positioning: any = '0';
  ambulation: any = '0';
  temperature: any = '0';
  pain_level: any = '0';
  dificulty_level: any = '0';
  symptoms_duration: any = '0';
  frequency_level: any = '0';

  tempo:any = '1:00';

  private countdownInterval: any;

  constructor(private route: ActivatedRoute, private router: Router, private qrService: QrserviceService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.background = params['background'] ? params['background'].split(',') : [];
      this.symptoms = params['symptoms'] ? params['symptoms'].split(',') : [];
      this.pain_locale = params['pain_locale'] ? params['pain_locale'].split(',') : [];
      this.pain_frequency = params['pain_frequency'] || '0';
      this.pain_radiation = params['pain_radiation'] || '0';
      this.positioning = params['positioning'] || '0';
      this.ambulation = params['ambulation'] || '0';
      this.temperature = params['temperature'] || '0';
      this.pain_level = params['pain_level'] || '0';
      this.dificulty_level = params['dificulty_level'] || '0';
      this.symptoms_duration = params['symptoms_duration'] || '0';
      this.frequency_level = params['frequency_level'] || '0';

    });
    this.updateCountdownTimer();
    this.startCountdownInterval();
  }


  generateQRCodeData(): string {
    // Construct the data for the QR code based on the component variables
    // For example, you can create a JSON object with the variable values and stringify it
    const qrCodeData = {
      background: this.background,
      symptoms: this.symptoms,
      pain_locale: this.pain_locale,
      pain_frequency: this.pain_frequency,
      pain_radiation: this.pain_radiation,
      positioning: this.positioning,
      ambulation: this.ambulation,
      temperature: this.temperature,
      pain_level: this.pain_level,
      dificulty_level: this.dificulty_level,
      symptoms_duration: this.symptoms_duration,
      frequency_level: this.frequency_level,
    };
  
    return JSON.stringify(qrCodeData);
  }

  goToMap(search:any) {
    this.clearCountdownInterval(); 
    this.router.navigate(['/map', search]);
  }

  goToTab1(){
    this.clearCountdownInterval(); 
    this.router.navigate(["/tabs/tab1"],{replaceUrl:true});
  }

  goToTab2(){
    //this.router.navigate(["/tabs/tab2"]);
  }

  goToTab3(){
    this.clearCountdownInterval(); 
    this.router.navigate(["/tabs/tab3"],{replaceUrl:true});
  }

  updateCountdownTimer() {
    const timestamp = this.qrService.getTimestamp();
    if (timestamp) {
      const oneHourInMillis = 60 * 60 * 1000;
      const currentTimestamp = new Date().getTime();
      const timeDifference = oneHourInMillis - (currentTimestamp - timestamp);

      if (timeDifference > 0) {
        const remainingHours = Math.floor(timeDifference / (60 * 60 * 1000));
        const remainingMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        this.tempo = `${remainingHours.toString().padStart(2, '0')}h:${remainingMinutes.toString().padStart(2, '0')}min`;
      } else {
        this.tempo = '0:00'; // If the time has already passed one hour, set tempo to 0
      }
    } else {
      this.tempo = '0:00'; // If there's no saved timestamp, set tempo to 0
    }
  }

  startCountdownInterval() {
    this.clearCountdownInterval(); // Clear any existing interval to avoid multiple intervals
    this.countdownInterval = setInterval(() => {
      this.updateCountdownTimer(); // Update the countdown timer every second
    }, 1000);
  }

  clearCountdownInterval() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval); // Clear the interval if it exists
    }
  }

}
