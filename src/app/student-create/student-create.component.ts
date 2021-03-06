import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { ApistudentService } from '../services/apistudent.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
data: Student
  constructor(public apiService: ApistudentService,
    public router: Router
  ) {
    this.data = new Student();

  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['/list']);
    });
    //this.router.navigate(['/list']);
 
  }

}
