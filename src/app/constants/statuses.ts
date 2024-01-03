import { IProperty } from "../interfaces/global/global.interfaces";

export enum ColorName {
  Active = 'active',
  Inactive = 'inactive',
  Open = 'open',
  Closed = 'closed',
  Verified = 'verified',
  Finalized = 'finalized',
  SubmittedForApproval = 'submitted_for_approval',
  Approved = 'approved',
  Deleted = 'deleted',
  Assigned = 'assigned',
  Recent = 'recent',
  Received = 'received',
  Sent = 'sent',
  All = 'all',
}

export interface IColorStatus {
  color: string,
  backgroundColor: string
}

export const STATUS_COLOR: IProperty<IColorStatus> = {
  [ColorName.Active]: { color: '#4ea079', backgroundColor: '#d7f3e8' },
  [ColorName.Inactive]: { color: '#b55866', backgroundColor: '#fae2e7' },
  [ColorName.Open]: { color: '#4ea079', backgroundColor: '#d7f3e8' },
  [ColorName.Closed]: { color: '#B5587F', backgroundColor: '#FDE7F0' },
  [ColorName.Verified]: { color: '#f1a33c', backgroundColor: '#FFF0CC' },
  [ColorName.Finalized]: { color: '#5975cf', backgroundColor: '#e7f0fd' },
  [ColorName.SubmittedForApproval]: { color: '#8BC34A', backgroundColor: '#E8F3DB' },
  [ColorName.Approved]: { color: '#BBC934', backgroundColor: '#EDF0CF' },
  [ColorName.Deleted]: { color: '#A64444', backgroundColor: '#FDE7E7' },
  [ColorName.Assigned]: { color: '#4ea079', backgroundColor: '#d7f3e8' },
  [ColorName.Recent]: { color: '#5975cf', backgroundColor: '#e7f0fd' },
  [ColorName.Received]: { color: '#4ea079', backgroundColor: '#d7f3e8' },
  [ColorName.Sent]: { color: '#f1a33c', backgroundColor: '#FFF0CC' },
  [ColorName.All]: { color: '#404246', backgroundColor: '#F5F5F5' },
}

export interface IStatus {
  key: ColorName,
  value: string,
  id: number,
}