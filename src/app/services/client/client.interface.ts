import { Validators } from "@angular/forms";
import { ITableItemsMeta } from "../../interfaces/shared/meta-table-items.interface";
import { formParamType } from "src/app/interfaces/shared/form.interface";
import { IKeyValue } from "src/app/interfaces/global/global.interfaces";

export interface IGeneralInformationModel {
    uuid?: string,
    client: string,
    street: string,
    postal_code: string,
    code: string,
    country_id: string,
    city: string,
    state: string,
}

export interface IClientContactModel {
    last_name: string,
    first_name: string,
    position_id: string,
    email: string,
    phone: string,
}

export interface IClientCreateUpdateModel {
    general: IGeneralInformationModel,
    contacts: IClientContactModel[],
}

export interface IGeneralInformationForm {
    uuid?: formParamType,
    client: formParamType,
    street: formParamType,
    postal_code: formParamType,
    code: formParamType,
    country_id: formParamType,
    city: formParamType,
    state: formParamType,
}

export interface IClientContactForm {
    last_name: formParamType,
    first_name: formParamType,
    position: formParamType,
    email: formParamType,
    phone: formParamType,
}

export const generalInformationFormParams: IGeneralInformationForm = {
    client: ['', [Validators.required]],
    street: ['', [Validators.required]],
    postal_code: ['', [Validators.required]],
    code: ['', [Validators.required]],
    country_id: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: [''],
}

export const clientContactFormParams: IClientContactForm = {
    last_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
}

// view client
export interface IDataClient {
    id: string,
    city: string,
    client: string,
    code: string,
    country: string,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    position: string,
    postal_code: string,
    state: string,
    status: string,
    street: string,
}

export interface IClientsMeta extends ITableItemsMeta {
    data: IDataClient[],
}

export interface IViewClient {
    uuid: string,
    city: string,
    client: string,
    code: string,
    country: IKeyValue<number, string>,
    postal_code: string,
    state: string,
    street: string,
    contacts: IViewClientContactModel[],
}

export interface IViewClientContactModel {
    uuid: string,
    last_name: string,
    first_name: string,
    position: string,
    email: string,
    phone: string,
}