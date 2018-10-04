import { Component, OnInit } from '@angular/core';
import { ApiService} from './app.component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RoomWeb';

  constructor(private web: ApiService) {

  }

  ngOnInit() {

  }


}
