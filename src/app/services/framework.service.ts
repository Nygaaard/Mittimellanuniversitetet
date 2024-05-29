import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  constructor() {}

  //Get courses
  getCourses(): Course[] {
    const courses = localStorage.getItem('courses');
    return courses ? JSON.parse(courses) : [];
  }
}
