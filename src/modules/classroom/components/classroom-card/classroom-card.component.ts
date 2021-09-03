import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import { Room} from '@modules/classroom/models';
import {ClassroomService} from '@modules/classroom/services';
import {Employees, Teacher} from '@modules/employees/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
@Component({
  selector: 'sb-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.scss']
})

export class ClassroomCardComponent implements OnInit {
  @Input() classroom: Room | undefined;
  ellipsis=faEllipsisV;
  @Input() pageSize = 4;
  collectionSize: any;
  private classroom$?: Observable<Room[]>;
  public createClassroomForm?: FormGroup;
  private idClassroom?: number;

  constructor(private classroomService:ClassroomService,
              public fb: FormBuilder,
              private modalService:NgbModal) {
    this.createClassroomForm = this.fb.group({
      idClassroom:new FormControl(''),
      name: new FormControl('',   Validators.required),
      scolarite :new FormControl('',   Validators.required),
      archived: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.classroomService.pageSize = this.pageSize;
    this.classroom$ = this.classroomService.classroom$;
  }

  createClassroom(content:Room) {
    this.modalService.open(content, { centered: true,size: 'sm' });
  }

  onSubmit() {
    if (this.idClassroom){
      this.classroomService.updateClassroom(this.createClassroomForm?.value,this.idClassroom)
      this.modalService.dismissAll()
    }
    else {
      this.classroomService.createClassroom(this.createClassroomForm?.value)
      this.modalService.dismissAll()
    }
  }

  editClassroom(classroom: Room, content: any) {
    this.idClassroom=classroom.id
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
    this.createClassroomForm?.patchValue({
      name: classroom.name,
      archived: classroom.archived,
    });
  }
  deleteClassroomModal( classroom: Room,deleteModal: any) {
    this.idClassroom=classroom.id
    this.modalService.open(deleteModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  deleteClassroom() {
    this.modalService.dismissAll();
    this.classroomService.deleteClassroom(this.idClassroom)
  }
  archiveClassroom(classroom: Room) {
    classroom.archived=!classroom.archived
    this.classroomService.pacthClassroom(classroom,classroom.id)
  }

  CloseModal() {
    this.modalService.dismissAll()
    this.createClassroomForm?.reset()
  }
}
