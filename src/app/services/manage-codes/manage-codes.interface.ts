
export interface IioCode {
  active: boolean,
  code: string,
  order: number,
  id: string,
}

export interface IMediaChannel {
  code: string,
  name: string,
  id: string,
}

export interface ICode {
  active: boolean,
  code: string,
  order: string,
  id: string,
}

export interface ITargetAudience {
  code: string,
  name: string,
  id: string,
}

export interface IManageCodes {
  io_codes: ICode[],
  media_channel: IMediaChannel[],
  media_codes: ICode[],
  target_audience: ITargetAudience[]
}
