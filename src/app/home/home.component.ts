import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //Properties
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  inputValue: string = '';
  subjects: string[] = [];
  selectedSubject: string = '';

  constructor(private courseservive: CoursesService) {}

  ngOnInit() {
    this.courseservive.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
      this.extractSubjects();
    });
  }

  //Method for filtering courses
  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesInput =
        course.courseName
          .toLowerCase()
          .includes(this.inputValue.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.inputValue.toLowerCase());

      const matchesSubject =
        this.selectedSubject === '' || course.subject === this.selectedSubject;

      return matchesInput && matchesSubject;
    });
  }

  //Method for sort by course code
  sortByCode(): void {
    this.filteredCourses.sort((a, b) => {
      if (a.courseCode < b.courseCode) return -1;
      if (a.courseCode > b.courseCode) return 1;
      return 0;
    });
  }

  //Method for sort by course name
  sortNyName(): void {
    this.filteredCourses.sort((a, b) => {
      if (a.courseName < b.courseName) return -1;
      if (a.courseName > b.courseName) return 1;
      return 0;
    });
  }

  //Method for sort by points
  sortByPoints(): void {
    this.filteredCourses.sort((a, b) => {
      if (a.points < b.points) return -1;
      if (a.points > b.points) return 1;
      return 0;
    });
  }

  //Method for sort by subject
  sortBySubject(): void {
    this.filteredCourses.sort((a, b) => {
      if (a.subject < b.subject) return -1;
      if (a.subject > b.subject) return 1;
      return 0;
    });
  }

  extractSubjects(): void {
    const subjectSet = new Set<string>();
    this.courses.forEach((course) => {
      subjectSet.add(course.subject);
    });
    this.subjects = Array.from(subjectSet);
  }
}
