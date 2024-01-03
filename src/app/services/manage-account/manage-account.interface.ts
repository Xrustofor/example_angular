import { Validators } from "@angular/forms";
import { IKeyValueString } from "../../interfaces/global/global.interfaces";
import { formParamType } from "src/app/interfaces/shared/form.interface";

export interface IPasswordConfirmationModel {
    password: string,
    password_confirmation: string,
}

export interface IGeneralInformationUpdateModel {
    last_name: string,
    first_name: string,
    title: string,
    email: string,
    phone: string,
}

export interface IGeneralInformationModel extends IGeneralInformationUpdateModel {
    role: string,
    status: IKeyValueString,
}

export interface IGeneralInformationUpdateForm {
    last_name: formParamType
    first_name: formParamType
    title: formParamType
    email: formParamType
    phone: formParamType,
}

export interface IPasswordConfirmationForm {
    password: formParamType,
    password_confirmation: formParamType,
}

export const generalInformationFormParams: IGeneralInformationUpdateForm = {
    last_name: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    title: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    phone: ['', [Validators.required, Validators.maxLength(13)]],
}

export const newPasswordFormParams: IPasswordConfirmationForm = {
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
}

export class ManageAccount {
    static toForm(data: IGeneralInformationModel, callback: (name: string, value: string) => any) {
        Object.keys(generalInformationFormParams).map((propertyName) => {
            const property = Object.entries(data)
                .find(([dataPropertyName]) => dataPropertyName === propertyName);

            if (property) callback(propertyName, property[1]);
        });
    }
}
