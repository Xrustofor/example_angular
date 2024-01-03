import { Validators } from "@angular/forms";
import { ITableItemsMeta } from "../../interfaces/shared/meta-table-items.interface";
import { IKeyValue, IKeyValueString } from "../../interfaces/global/global.interfaces";
import { formParamType } from "src/app/interfaces/shared/form.interface";

export interface IGeneralInformationModel {
    uuid?: string,
    name: string,
    street: string,
    postal_code: string,
    code: string,
    country_id: string,
    city: string,
    state: string,
}

export interface IMainContactModel {
    last_name: string,
    first_name: string,
    position: string,
    email: string,
    phone: string,
}

export interface IOtherContactModel {
    last_name: string,
    first_name: string,
    position: string,
    email: string,
    phone: string,
    role: string,
    status: string,
}

export interface IAgencyCreateUpdateModel {
    general: IGeneralInformationModel,
    main: IMainContactModel,
    contacts: IOtherContactModel[],
}

export interface IGeneralInformationForm {
    uuid?: formParamType,
    name: formParamType,
    street: formParamType,
    postal_code: formParamType,
    code: formParamType,
    country_id: formParamType,
    city: formParamType,
    state: formParamType,
}

export interface IMainContactForm {
    uuid?: formParamType,
    last_name: formParamType,
    first_name: formParamType,
    position: formParamType,
    email: formParamType,
    phone: formParamType,
    role: formParamType,
}

export interface IOtherContactForm extends IMainContactForm {
    role: formParamType,
    status: formParamType,
}

export const generalInformationFormParams: IGeneralInformationForm = {
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    postal_code: ['', [Validators.required]],
    code: ['', [Validators.required]],
    country_id: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: [''],
}

export const mainAgencyContactFormParams: IMainContactForm = {
    last_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    role: ['', [Validators.required]],
}

export const otherContactFormParams: IOtherContactForm = {
    last_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    role: [null, [Validators.required]],
    status: [null, [Validators.required]],
}

export interface IDataAgency {
    id: string,
    country_id: string,
    city: string,
    code: string,
    email: string,
    main_contact: string,
    name: string,
    phone: string,
    position: string,
    postal_code: string,
    state: string,
    status: boolean,
}

export interface IAgenciesMeta extends ITableItemsMeta {
    data: IDataAgency[],
}

// view agency
export interface IViewAgency {
    general: IAgencyGeneralInforamtion,
    main: IAgencyMainContact,
    contacts: IAgencyOtherContactInforamtion[],
}

export interface IAgencyGeneralInforamtion {
    uuid: string,
    name: string,
    country: IKeyValue<number, string>,
    state: string | null,
    city: string,
    street: string,
    postal_code: string,
    code: string,
}

export interface IAgencyMainContact {
    uuid: string,
    last_name: string,
    first_name: string,
    position: string,
    email: string,
    phone: string,
    role: {
        key: string,
        value: string,
        list: IKeyValueString[]
    },
    statuses: IKeyValueString[],
}

export interface IAgencyOtherContactInforamtion {
    uuid: string,
    role: {
        key: string,
        value: string,
        list: IKeyValueString[]
    },
    status: string,
    first_name: string,
    last_name: string,
    position: string,
    email: string,
    phone: string,
}