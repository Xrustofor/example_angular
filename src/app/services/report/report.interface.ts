import { Validators } from "@angular/forms";
import { formParamType } from "src/app/interfaces/shared/form.interface";

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

export interface IReportFilterModel {
    last_name: string,
    first_name: string,
    position_id: string,
    email: string,
    phone: string,
}

export interface IReportCreateModel {
    general: IGeneralInformationModel,
    filters: IReportFilterModel,
}

export interface IGeneralInformationForm {
    name: formParamType,
    report_id: formParamType,
    start_date: formParamType,
    end_date: formParamType,
}

export interface IReportFilterForm {
    agency: formParamType,
    client: formParamType,
    year: formParamType,
    campaign: formParamType,
    audience: formParamType,
    media_channel: formParamType,
    campaign_status: formParamType,
    media_plan: formParamType,
    media_plan_status: formParamType,
    media_outlet: formParamType,
}

export const generalInformationFormParams: IGeneralInformationForm = {
    name: ['', [Validators.required]],
    report_id: [''],
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
}

export const filtersFormParams: IReportFilterForm = {
    agency: [''],
    client: [''],
    year: [''],
    campaign: [''],
    audience: [''],
    media_channel: [''],
    campaign_status: [''],
    media_plan: [''],
    media_plan_status: [''],
    media_outlet: [''],
}