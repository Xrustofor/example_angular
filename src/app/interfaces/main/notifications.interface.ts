export interface IapiOneMessage {
  id: string,
  receiver_uuid: number,
  content: string,
  created_at: number,
  type: string,
  sender: {
    uuid: number,
    fullName: string,
  }
}

export interface IapiMessage {
  content: string;
  uuid: string;
  subject: string;
  updated_at: number;
}

export interface INotificationsItem {
  title: string,
  date: number,
  text: string,
  type: 'bell' | 'message' | "user"
  uuid: string,
}
