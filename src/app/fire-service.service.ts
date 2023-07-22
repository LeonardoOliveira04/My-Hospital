import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Appointment, AppointmentWithId } from './Appointment';
import { Observable, catchError, last, map, of, switchMap, take } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  private snapshotChangesSubscription: any;

  constructor(public af: AngularFirestore, private storage: AngularFireStorage, private notificationsService:NotificationsService) { }

  private currentUser: firebase.User | null = null;

  setUser(user: firebase.User) {
    this.currentUser = user;
  }

  clearUser() {
    this.currentUser = null;
  }

  getUser() {
    return this.currentUser;
  }



  getAppointments(): Observable<AppointmentWithId[]> {
    const currentUser = firebase.auth().currentUser;
    const currentDate = new Date();
    this.notificationsService.printNotificationStack();
    
    return this.af.collection('people').doc(currentUser!.uid).collection('appointments').snapshotChanges()
      .pipe(
        map((snapshot: any[]) => {
          return snapshot.map((item: { payload: { doc: { id: any; data: () => Appointment; }; }; }) => {
            const appointmentId = item.payload.doc.id; // Get the appointment ID
            const appointmentData = item.payload.doc.data() as Appointment; // Get the appointment data
            return {
              id: appointmentId,
              ...appointmentData,
            } as AppointmentWithId;
          })
          .filter((appointment: AppointmentWithId) => {
            const appointmentDate = this.convertToDate(appointment.date);
            return appointmentDate >= currentDate; // Filter out appointments with past dates
          })
          .sort((a: AppointmentWithId, b: AppointmentWithId) => {
            const dateA = this.convertToDate(a.date);
            const dateB = this.convertToDate(b.date);
            return dateA.getTime() - dateB.getTime();
          });
        })
      );
  }
  

  convertToDate(dateString: String): Date {
    const [day, month, year] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }


  createAppointment(t: Appointment) {
    const currentUser = firebase.auth().currentUser;
    const appointmentData = { ...t }; // Create a plain object from the Appointment instance

    this.notificationsService.scheduleNotification(
      t.date,
      t.slot,
      'Consulta de '+t.type+' às '+t.slot.split("-")[0],
      // Generate a unique ID for the notification using the appointment's date and time
      this.generateNotificationId(t)
    );

    return this.af.collection('people').doc(currentUser!.uid).collection('appointments').add(appointmentData);
  }


  updateAppointment(appointmentID: any, t: Appointment | AppointmentWithId): Promise<void> {
    const currentUser = firebase.auth().currentUser;
    const { id, ...appointmentData } = t as AppointmentWithId;
  
    return new Promise<void>((resolve, reject) => {
      this.af
        .collection('people')
        .doc(currentUser!.uid)
        .collection('appointments')
        .doc(appointmentID)
        .get()
        .subscribe((snapshot: any) => {
          const previousAppointment = snapshot.data() as Appointment;
          const previousNotificationId = this.generateNotificationId(previousAppointment);
  
          // Delete the previous scheduled notification
          this.notificationsService.deleteNotification(previousNotificationId);
  
          // Update the appointment
          this.af
            .collection('people')
            .doc(currentUser!.uid)
            .collection('appointments')
            .doc(appointmentID)
            .set(appointmentData)
            .then(() => {
              // Schedule a new notification with the updated details
              this.notificationsService.scheduleNotification(
                t.date,
                t.slot,
                'Appointment reminder',
                this.generateNotificationId(t)
              );
              resolve(); // Resolve the promise without any value
            })
            .catch((error) => {
              reject(error);
            });
        });
    });
  }
  
  

  deleteAppointment(appointmentID: any) {
    const currentUser = firebase.auth().currentUser;

    return this.af
      .collection('people')
      .doc(currentUser!.uid)
      .collection('appointments')
      .doc(appointmentID)
      .get()
      .subscribe((snapshot: any) => {
        const appointment = snapshot.data() as Appointment;

        // Delete the scheduled notification
        const notificationId = this.generateNotificationId(appointment);
        this.notificationsService.deleteNotification(notificationId);

        // Delete the appointment
        this.af
          .collection('people')
          .doc(currentUser!.uid)
          .collection('appointments')
          .doc(appointmentID)
          .delete();
      });
  }
  
  unsubscribeOnLogOut() {
    // Remember to unsubscribe from the snapshotChanges
    if (this.snapshotChangesSubscription) {
      this.snapshotChangesSubscription.unsubscribe();
    }
  }

  getImageUrl(): Observable<string | null> {
    const filePath = `images/${this.getUser()?.uid}`;
    const fileRef = this.storage.ref(filePath);
    return new Observable((observer) => {
      fileRef.getDownloadURL().subscribe(
        (url: string) => {
          observer.next(url);
        },
        (error: any) => {
          if (error.code === 'storage/object-not-found') {
            observer.next(null); // Object not found, return null
          } else {
            observer.error(error); // Other error occurred
          }
        }
      );
    });
  }

  uploadImage(file: File): Promise<void> {
    const filePath = `images/${this.getUser()?.uid}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.put(file).then(() => {
      console.log('Image uploaded successfully.');
    });
  }

  private generateNotificationId(appointment: Appointment): number {
    // Convert the appointment date and time to a unique number
    const [day, month, year] = appointment.date.split('-');
    const [startTime, endTime] = appointment.slot.split('-');
    const [startHours, startMinutes] = startTime.split(':');
    const [endHours, endMinutes] = endTime.split(':');

    const idString = `${year}${month}${day}${startHours}${startMinutes}${endHours}${endMinutes}`;
    return parseInt(idString);
  }

  
}