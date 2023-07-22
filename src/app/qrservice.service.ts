import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrserviceService {

  private readonly storageKey = 'qrData';

  saveData(
    background: string[],
    symptoms: string[],
    painLocale: string[],
    painFrequency: string,
    painRadiation: string,
    positioning: string,
    ambulation: string,
    temperature: string,
    painLevel: string,
    difficultyLevel: string,
    symptomsDuration: string
  ) {
    const timestamp = new Date().getTime(); // Get the current timestamp

    // Create an object with the data and timestamp
    const data = {
      background,
      symptoms,
      painLocale,
      painFrequency,
      painRadiation,
      positioning,
      ambulation,
      temperature,
      painLevel,
      difficultyLevel,
      symptomsDuration,
      timestamp
    };
    console.log("guardar",data);
    // Save the data to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }


  getData() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    const timestamp = parsedData.timestamp;
    const hourInMillis = 60 * 60 * 1000; // 1 hour in milliseconds
    const currentTimestamp = new Date().getTime();

    if (currentTimestamp - timestamp > hourInMillis) {
      // Clear the outdated data
      this.clearData();
      return null;
    }

    return parsedData;
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
  }

  getTimestamp(){
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    const timestamp = parsedData.timestamp;
    return timestamp;
  }

}
