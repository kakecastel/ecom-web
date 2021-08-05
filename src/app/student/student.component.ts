import { Component, OnInit } from '@angular/core';
import { ApistudentService } from '../services/apistudent.service';
import { Student } from '../model/student.model';
import { Router} from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentsData: any;
  constructor(
    public apiService: ApistudentService,public router: Router
  ) {
    this.studentsData = [];
  }

  ngOnInit() {
  this.getAllStudents();
  console.log("bonjour");
  }

  getAllStudents() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      //console.log(response);
      this.studentsData = response;
    })
    
  }
 delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllStudents();
    });
  }
  onAffichestudent(student:Student){
	//console.log("la valeur du lien envoyer  "+p._links.product.href);
	let id=student.id;
	console.log("la valeur de id dans la liste   "+id);
    this.router.navigateByUrl("edit/"+id);
}


}
