import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Appointment } from './Appointment';
import { Plugins } from '@capacitor/core';

const { FCM } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  saveSettings(settings: any) {
    // Save the notification settings in the device memory
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }

  loadSettings() {
    // Load the notification settings from the device memory
    const settingsString = localStorage.getItem('notificationSettings');
    if (settingsString) {
      return JSON.parse(settingsString);
    } else {
      return {
        consultaToggle: false,
        consultaDuration: "6",
        triagemToggle: true,
        triagemDuration: "45"
      };
    }
  }

  scheduleNotification(date: string, time: string, message: string, idn: any) {
    console.log("Notification date: ", date);
    console.log("Notification time: ", time);
    console.log("Notification message: ", message);
    console.log("Notification id: ", idn);
  
    // Parse the date and time strings into a Date object
    const [day, month, year] = date.split('-');
    const [hours, minutes] = time.split('-')[0].split(':');
  
    const notificationDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
    console.log("Notification time parsed: ", notificationDateTime);
  
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'My-Hospital',
          body: message,
          id: idn,
          schedule: { at: notificationDateTime },
          sound: 'default',
          smallIcon: 'ic_notification',
        }
      ]
    });

    this.printNotificationStack();
  }
  
  deleteNotification(notificationId: number) {
    console.log("Delete notification with ID: ", notificationId);
    LocalNotifications.cancel({ notifications: [{ id: notificationId }] });
  }
  
  printNotificationStack() {
    LocalNotifications.getPending().then((notifications) => {
      console.log('Notification stack:', notifications);
    });
  }

  clearNotificationStack() {
    const { LocalNotifications } = Plugins;
  
    LocalNotifications['getPending']().then((notifications: any[]) => {
      const notificationIds = notifications.map((notification) => notification.id);
      if (notificationIds.length > 0) {
        LocalNotifications['cancel']({ notifications: notificationIds }).then(() => {
          console.log('Notification stack cleared');
        });
      }
    });
  }
  
  

}
