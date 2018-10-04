import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.component.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatMenuTrigger} from '@angular/material';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) trigger2: MatMenuTrigger;

  nodes = [];
  options: FormGroup;
  sideItems: string[];
  nameIdDict = {};
  floors = [];
  rooms = [];
  building: string;
  buildingClicked(name: string) {
    this.trigger.openMenu();
    console.log("Building selected: " + name);
    console.log("Id:" + this.nameIdDict[name]);
    this.web.getFloors(this.nameIdDict[name]).subscribe(result => {
      console.log(result);
      this.floors = result as string[];
      this.building = this.nameIdDict[name];
    });
  }
  floorClicked(floor: string) {

    console.log("Floor selected:" + floor);
    this.web.getRooms(floor, this.building).subscribe(result => {
      console.log(result);
      this.rooms = result as string[];
      console.log("rooms")
      console.log(this.rooms);
    });
  }



  constructor(private web: ApiService, fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  ngOnInit() {
    this.web.getBuildings().subscribe((res) => {
      let resList = res as any[];
      for(var i = 0; i < resList.length; i++) {
        this.nameIdDict[res[i].BuildingName] = res[i].BuildingId;
      }
      this.sideItems = resList.map(a => a.BuildingName);
      //console.log(res);
    });
  }

}
