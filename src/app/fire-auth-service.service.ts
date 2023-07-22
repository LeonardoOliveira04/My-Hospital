import { Injectable } from '@angular/core';
import { FireserviceService } from './fire-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataInterface } from './UserData';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  public readonly USER_STORAGE_KEY = 'currentUser';

  constructor(
    private firebaseService: FireserviceService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserServiceService,
  ) {}


  logout() {
    this.afAuth.signOut();
    this.firebaseService.clearUser();
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.doLogout();
  }

  doRegister(value: { name:any; email: any; password: any; ncidadao: any; nsaude: any }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(async (res) => {
          const user = res.user;
          // Add user information to the 'people' collection
          this.firestore.collection('people').doc(user!.uid).set({
            name: value.name,
            email: value.email,
            ncidadao: value.ncidadao,
            nsaude: value.nsaude
          })
          .then(() => resolve(res))
          .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  doLogin(value: { email: any; password: any }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      this.afAuth
        .signOut()
        .then(() => {
          this.firebaseService.unsubscribeOnLogOut();
          resolve();
          this.firebaseService.clearUser();
          localStorage.removeItem(this.USER_STORAGE_KEY);
        })
        .catch((error: any) => {
          console.log(error);
          reject();
        });
    });
  }

  getUserData(uid: string) {
    return this.firestore.collection('people').doc(uid).get().toPromise()
      .then((doc) => {
        if (doc!.exists) {
          return doc!.data();
        } else {
          throw new Error('User data not found.');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  resetPassword(email:string) {
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        console.log('Email foi enviado');
      })
      .catch((error: any) => {
        // Handle error during password reset
        console.log(error);
      });
  }


}
