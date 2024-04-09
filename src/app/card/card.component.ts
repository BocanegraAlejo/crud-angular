import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../models/Student';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() item: Student = new Student();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(item: Student) {
    this.edit.emit(item);
  }

  onDelete(item: Student) {
    this.delete.emit(item);
  }
}
