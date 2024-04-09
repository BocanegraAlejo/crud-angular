import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { Student } from './models/Student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];
  
  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }
  openModel() {
    const model = document.getElementById("myModal");
    if(model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if(this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  onDelete(item: Student) {
    const isDelete = confirm('Are you sure want to Delete ?');
    if(isDelete) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  saveStudent() {
   
    const isLocalPresent = localStorage.getItem("angular17crud");
    if(isLocalPresent != null) {
    
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    }else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if(currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }
}



