import {EmergencyContacts, Institution} from '@modules/employees/models';

export interface Country {
    [key: string]: string | number;

    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

export interface Students {

    code: number,
    oldId: string,
    firstName: string,
    middleName:string,
    lastName: string,
    gender: string,
    email: string,
    phone1: string,
    phone2: string,
    enrollmentDate: string,
    birthday:string,
    institutions: Institution,
    course: string,
    nationality: string,
    identificationType: string
    identificationNumber: string
    address:string;
    city:string;
    country:string;
    profession: string
    schoolName: string
    schoolPlace: string
    schoolType: string
    niveauEtude: string
    systemEtude: string
    serieBac: string,
    moyenneBac: number,
    emergencyContacts: EmergencyContacts;


}
