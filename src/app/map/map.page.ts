import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  key = 'AIzaSyA_xalZl5Vp470vg0Nw-5_OkW7TydGRhKQ';
  search:any = 'hospital';
  src:any = '';

  ngOnInit() {
    this.search = this.activatedRoute.snapshot.paramMap.get('search');
    if(this.search == 'hospital'){
      this.src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA_xalZl5Vp470vg0Nw-5_OkW7TydGRhKQ&q=hospital"
    }
    else{
      this.src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA_xalZl5Vp470vg0Nw-5_OkW7TydGRhKQ&q=centro de saude rio de mouro"
    }
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

