import { Validators } from "@angular/forms";
import { ITableItemsMeta } from "../../interfaces/shared/meta-table-items.interface";
import { formParamType } from "src/app/interfaces/shared/form.interface";

export interface IGeneralInformationModel {
    uuid?: string,
    id: string,
    name: string,
}

export interface IRfpCampaignInformationModel {
    uuid?: string,
    agency: string,
    client: string,
    campaign: string,
    start: string,
    end: string,
    target_audience: string,
    media_channel: string,
    about: string,
    strategy: string,
    deadline: string,
}

export interface IRfpAttachmentModel {
    name: string,
    type: string,
    size: string,
    extension: string,
    date: string,
}

export interface IRfpMediaItemModel {
    uuid?: string,
    media_outlet: string,
    contact_name: string,
    position: string,
    email: string,
    budget_amount: string,
    status?: string,
}

export interface IRfpCreateUpdateModel {
    info: IGeneralInformationModel,
    // campaign: IRfpCampaignInformationModel,
    attachment: IRfpAttachmentModel[],
    media_list: IRfpMediaItemModel[],
}

export interface IGeneralInformationForm {
    uuid?: formParamType,
    id: formParamType,
    name: formParamType,
}

export interface IRfpCampaignInformationForm {
    agency: formParamType,
    client: formParamType,
    campaign: formParamType,
    start: formParamType,
    end: formParamType,
    country_id: formParamType,
    media_channel: formParamType,
    about: formParamType,
    strategy: formParamType,
    deadline: formParamType,
}

export interface IRfpAttachmentForm {
    name: formParamType,
    type: formParamType,
    size: formParamType,
    extension: formParamType,
    date: formParamType,
}

export interface IRfpMediaItemForm {
    media_outlet: formParamType,
    contact_name: formParamType,
    position: formParamType,
    email: formParamType,
    budget_amount: formParamType,
    status?: formParamType,
}

export const generalInformationFormParams: IGeneralInformationForm = {
    id: [''],
    name: ['', [Validators.required]],
}

export const campaignInformationFormParams: IRfpCampaignInformationForm = {
    agency: [''],
    client: ['', [Validators.required]],
    campaign: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    country_id: ['', [Validators.required]],
    media_channel: ['', [Validators.required]],
    about: ['', [Validators.required]],
    strategy: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
}

export const attachmentFormParams: IRfpAttachmentForm = {
    name: [''],
    type: [''],
    size: [''],
    extension: [''],
    date: [''],
}

export const mediaRFPItemForm: IRfpMediaItemForm = {
    media_outlet: ['', [Validators.required]],
    contact_name: [null, [Validators.required]],
    position: ['', [Validators.required]],
    email: ['', [Validators.required]],
    budget_amount: [''],
    status: [''],
}

export interface IRfpMeta extends ITableItemsMeta {
    data: IDataRfp[],
}

// view rfp
export interface IDataRfp {
    uuid: string,
    agency: string,
    client: string,
    year: string,
    campaign: string,
    code: string,
    start: string,
    end: string,
    status: string,
}

export interface IViewRfp extends IDataRfp {
    rfps: {
        list: IViewProposalRequestItem[],
    }
}

export interface IViewProposalRequestItem {
    uuid?: string,
    name: string,
    id: string,
    media_outlet: string,
    modified_date: string,
    created_by: string,
    status: string,
}