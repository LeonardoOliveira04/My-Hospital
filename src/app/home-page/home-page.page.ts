import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { IonItemSliding, NavController } from '@ionic/angular';
import { FireserviceService } from '../fire-service.service';
import { Router } from '@angular/router';
import { FireauthService } from '../fire-auth-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  tasks: Array<any> = [];

  constructor(public fser: FireserviceService, public router: Router, public authService: FireauthService, public navCtrl: NavController) {
    this.tasks = [
      { title: 'Milk', status: 'open' },
      { title: 'Eggs', status: 'open' },
      { title: 'Pancake Mix', status: 'open' }
    ];
  }

  ngOnInit() {
    /*this.fser.getTasks().subscribe(data => {
      this.tasks = data.map((e: any) => {
        return {
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          status: e.payload.doc.data()['status'],
        };
      });
      console.log(this.tasks);
      if(this.tasks.length==0){
        this.tasks = [
          { title: 'Milk', status: 'open' },
          { title: 'Eggs', status: 'open' },
          { title: 'Pancake Mix', status: 'open' }
        ];
      }
    });*/
  }

  /*addTask() {
    let theNewTask: string = prompt("New Task")!;
    if (theNewTask !== '') {
      this.tasks.push({ title: theNewTask, status: 'open' });
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = "done";
    slidingItem.close();
  }
  removeTask(slidingItem: IonItemSliding, task: Task) {
    task.status = "removed";
    // Include code to remove the task element of the array tasks
    this.tasks.splice(this.tasks.indexOf(task), 1);
    slidingItem.close();
  }*/

  /*addTask() {
    let ntask: string = prompt("New Task")!;
    if (ntask !== "") {
      let t: Task = { $key: '', title: ntask, status: 'open' };
      console.log(t);
      this.fser.createTask(t).then(resp => {
        console.log("createTask: then - " + resp);
      })
        .catch((error: string) => {
          console.log("createTask: catch - " + error);
        });
      console.log("addTask: " + this.tasks);
    }
  }
  markAsDone(slidingItem: IonItemSliding, task: any) {
    task.status = (task.status === "done") ? "open" : "done";
    console.log("markAsDone " + task);
    this.fser.updateTask(task.$key, task);
    slidingItem.close();
  }
  removeTask(slidingItem: IonItemSliding, task: any) {
    task.status = "removed";
    this.fser.deleteTask(task.$key);
    slidingItem.close();
  }

  logout() {
    this.authService.afAuth.signOut()
      .then(res => {
        this.router.navigate(["/login"]);
      }, err => {
        console.log(err);
      })
  }*/
}
