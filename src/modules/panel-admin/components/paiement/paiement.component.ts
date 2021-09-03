import { Component, OnInit } from '@angular/core';
import { Students } from '@modules/student/models';
import { StudentService } from '@modules/student/services/students.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  
  selectedItems = []; 
  dropdownSettingMensualite: any = {};
  nosMensualites?: { id: number; libelle: string; }[];
  private student$?: Observable<Students[]>;
  dropdownSettingsStudent?: { singleSelection: boolean; idField: string; itemsShowLimit: number; textField: string; selectAllText: string; allowSearchFilter: boolean; unSelectAllText: string; };
  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.studentService.getAllStudents()
    this.student$=this.studentService.student$;
    this.dropdownSettingsStudent = {
      singleSelection: true,
      idField: 'code',
      itemsShowLimit: 30,
      textField: '${firstName}',
      selectAllText: 'Select All',
      allowSearchFilter: true,
      unSelectAllText: 'UnSelect All',
    }
    this.nosMensualites= [
      { id: 1, libelle: 'Janvier' },
      { id: 2, libelle: 'Fevrier' },
      { id: 3, libelle: 'Mars' },
      { id: 4, libelle: 'Avril' },
      { id: 5, libelle: 'Mais' },
      { id: 6, libelle: 'Juin' },
      { id: 7, libelle: 'Juillet' },
      { id: 8, libelle: 'Aout' },
      { id: 9, libelle: 'Septembre' },
      { id: 10, libelle: 'Octobre' },
      { id: 11, libelle: 'Novembre' },
      { id: 12, libelle: 'Decembre' },
    ];

    this.dropdownSettingMensualite = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
