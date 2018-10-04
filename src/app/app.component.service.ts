import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl = 'http://localhost:3000/api/'
  getBuildings() {
    return this.http.get(this.configUrl + "get_buildings");
  }
  getCourses() {
    return this.http.get(this.configUrl + "get_courses");
  }
  getCourseSections() {
    return this.http.get(this.configUrl + "get_coursesections");
  }
  getFloors(name: string) {
    return this.http.get(this.configUrl + "get_floors_by_building?id=" + name);
  }
  getRooms(floor: string, building: string) {
    return this.http.get(this.configUrl + "get_rooms_by_floor?floor=" + floor + "&building=" + building);
  }
  constructor(private http: HttpClient) { }
}
