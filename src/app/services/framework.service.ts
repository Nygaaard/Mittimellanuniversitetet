import { Injectable } from '@angular/core';
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

  // Get total points
  getTotalPoints(): number {
    const courses = this.getCourses();
    return courses
      .map((course) => parseFloat(course.points))
      .reduce((a, c) => a + c, 0);
  }
}
