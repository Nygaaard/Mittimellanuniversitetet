import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { HomepageCourse } from '../models/homepage-course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //Properties
  courses: HomepageCourse[] = [];

  constructor(private courseservive: CoursesService) {}

  ngOnInit() {
    this.courseservive.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
