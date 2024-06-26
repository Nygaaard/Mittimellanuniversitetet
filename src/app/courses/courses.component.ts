import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FrameworkService } from '../services/framework.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  //Properties
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  inputValue: string = '';
  subjects: string[] = [];
  selectedSubject: string = '';
  totalPoints: number = 0;

  constructor(
    private courseservive: CoursesService,
    private frameworkService: FrameworkService
  ) {}

  ngOnInit() {
    this.courseservive.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;
      this.extractSubjects();
    });
    this.totalPoints = this.frameworkService.getTotalPoints();
  }

  //Method for filtering courses
  filterCourses(): void {
    if (this.selectedSubject === '-- Alla ämnen --') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter((course) => {
        const matchesInput =
          course.courseName
            .toLowerCase()
            .includes(this.inputValue.toLowerCase()) ||
          course.courseCode
            .toLowerCase()
            .includes(this.inputValue.toLowerCase());

        const matchesSubject =
          this.selectedSubject === '' ||
          course.subject === this.selectedSubject;

        return matchesInput && matchesSubject;
      });
    }
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

  //Method for extracting single subjects for select element
  extractSubjects(): void {
    const subjectSet = new Set<string>();
    this.courses.forEach((course) => {
      subjectSet.add(course.subject);
    });
    this.subjects = Array.from(subjectSet);
    this.subjects.unshift('-- Alla ämnen --');
  }

  addCourse(course: Course): void {
    const existingCourses = localStorage.getItem('courses');
    if (existingCourses) {
      const parsedCourses = JSON.parse(existingCourses!);
      if (Array.isArray(parsedCourses)) {
        const courses: Course[] = [...parsedCourses, course];
        localStorage.removeItem('courses');
        localStorage.setItem('courses', JSON.stringify(courses));
      } else {
        const courses: Course[] = [parsedCourses, course];
        localStorage.removeItem('courses');
        localStorage.setItem('courses', JSON.stringify(courses));
      }
      console.log(parsedCourses);
    } else {
      localStorage.setItem('courses', JSON.stringify(course));
    }
    this.totalPoints = this.frameworkService.getTotalPoints();
  }
}
