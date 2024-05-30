import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FrameworkService } from '../services/framework.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.scss',
})
export class FrameworkComponent {
  //Properties
  courses: Course[] = [];
  totalPoints: number = 0;

  constructor(private frameworkservice: FrameworkService) {}

  ngOnInit() {
    this.courses = this.frameworkservice.getCourses();

    //Calculate total chosen points
    this.totalPoints = this.courses
      .map((course) => parseFloat(course.points))
      .reduce((a, c) => {
        return a + c;
      }, 0);
  }

  //Method for removing course
  removeCourse(courseCode: string): void {
    const newCourses: Course[] = this.courses.filter(
      (course) => course.courseCode !== courseCode
    );

    if (newCourses) {
      const courses = JSON.stringify(newCourses);

      localStorage.removeItem('courses');
      localStorage.setItem('courses', courses);

      this.courses = newCourses;
    }
  }
}
