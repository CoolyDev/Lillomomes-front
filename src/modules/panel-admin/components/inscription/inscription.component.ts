import { Component, OnInit } from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Students } from "@modules/student/models";
import { StudentService } from "@modules/student/services/students.service";
import { Observable } from "rxjs";

@Component({
  selector: "sb-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.scss"],
})
export class InscriptionComponent implements OnInit {
  selectedItems:any;
  dropdownSettingMensualite: any = {};
  nosMensualites?: { id: number; libelle: string }[];
  private student$?: Observable<Students[]>;
  dropdownSettingsStudent?: {
    singleSelection: boolean;
    idField: string;
    itemsShowLimit: number;
    textField: string;
    selectAllText: string;
    allowSearchFilter: boolean;
    unSelectAllText: string;
  };
  inscriptionPaiement?: FormGroup;
  //Getter & Setter
  get mensualiteInscription() { return this.inscriptionPaiement?.get("mensualiteInscription") as FormArray}
  get montantPaye() { return this.inscriptionPaiement?.get("montantPaye")}
  get montantRestant() { return this.inscriptionPaiement?.get("montantRestant")}
  get montantTotal() { return this.inscriptionPaiement?.get("montantTotal")}
  constructor(
    private studentService: StudentService,
    public fb: FormBuilder
  ) {
    this.inscriptionPaiement = new FormGroup(
        {
          code: new FormControl('', Validators.required),
          typePaiement:new FormControl('', Validators.required),
          inscriptionDate:new FormControl('', Validators.required),
          montantTotal:new FormControl('', Validators.required),
          mensualiteInscription:new FormControl('', Validators.required),
          montantPaye:new FormControl(''),
          montantRestant:new FormControl(''),
          inscriptionComment:new FormControl(''),
          trimestreSelect:new FormControl(''),
        }
    )
  }

  ngOnInit() {
    this.studentService.getAllStudents();
    this.student$ = this.studentService.student$;
    this.dropdownSettingsStudent = {
      singleSelection: true,
      idField: "code",
      itemsShowLimit: 30,
      textField: "${firstName}",
      selectAllText: "Select All",
      allowSearchFilter: true,
      unSelectAllText: "UnSelect All",
    };
    this.nosMensualites = [
      { id: 1, libelle: "Janvier" },
      { id: 2, libelle: "Fevrier" },
      { id: 3, libelle: "Mars" },
      { id: 4, libelle: "Avril" },
      { id: 5, libelle: "Mais" },
      { id: 6, libelle: "Juin" },
      { id: 7, libelle: "Juillet" },
      { id: 8, libelle: "Aout" },
      { id: 9, libelle: "Septembre" },
      { id: 10, libelle: "Octobre" },
      { id: 11, libelle: "Novembre" },
      { id: 12, libelle: "Decembre" },
    ];
    this.dropdownSettingMensualite = {
      singleSelection: false,
      idField: "id",
      textField: "libelle",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 13,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  changeNom(event: any) {
    console.log(event.target.value);
  }
  changePaiementType(event: any) {
    console.log(event.target.value);
  }
  changeTrimestre(event: any) {
    console.log(event.target.value);
    if (event.target.value == "Trimestre1") {
      this.selectedItems = [
        { id: 9, libelle: "Septembre" },
        { id: 10, libelle: "Octobre" },
        { id: 11, libelle: "Novembre" },
        { id: 12, libelle: "Decembre" },
      ];
    }
    if (event.target.value == "Trimestre2") {
      this.selectedItems = [
        { id: 1, libelle: "Janvier" },
        { id: 2, libelle: "Fevrier" },
        { id: 3, libelle: "Mars" },
      ];
    }
    if (event.target.value == "Trimestre3") {
      this.selectedItems = [
        { id: 4, libelle: "Avril" },
        { id: 5, libelle: "Mais" },
        { id: 6, libelle: "Juin" },
      ];
    }
    this.montantCalcul();
  }
  montantCalcul(){
    this.mensualiteInscription.setValue(this.selectedItems, {
      onlySelf: true
    })
    this.montantPaye?.setValue(this.selectedItems.length*1500, {
      onlySelf: true
    })
    this.montantRestant?.setValue((this.montantTotal?.value-this.montantPaye?.value), {
      onlySelf: true
    })
  }
  onSubmit(content: any)
  {
    console.log(content)
  }
}
