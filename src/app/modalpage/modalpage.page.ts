import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {

  @Input() value!: string;
  constructor(public modalContr: ModalController, public sanitizer:DomSanitizer) { }

  getValue(): string {
    return this.value;
  }
  dismiss() {
    this.modalContr.dismiss();
  }
  ngOnInit() {
  }
}

