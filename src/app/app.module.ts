import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './app.component.service';
import { TreeModule } from 'angular-tree-component';
import { RoomComponent } from './room/room.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSidenavModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/room',
    pathMatch: 'full'
  },
  { path: 'room', component:RoomComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent
    ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule, HttpClientModule, MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,MatIconModule,
MatSidenavModule, MatListModule, TreeModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
