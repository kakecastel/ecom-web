import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../model/student.model';
import { ApistudentService } from '../services/apistudent.service';
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
 id: number;
 data: Student;
 
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApistudentService) {
    this.data=new Student();

     }

  ngOnInit() {
  this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
    
  }
  update() {
    //Update item by taking id and updated data object
    console.log("voici le nom de object  "+this.data.name);
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['/list']);
    })
  }

}
