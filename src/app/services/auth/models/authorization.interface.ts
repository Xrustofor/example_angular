export interface IUserAuthorization {
  full_name: string,
  profile_photo: string,
}
export interface IAppAuthorization {
  namespace: string,
  title: string,
  name: string,
  logo: string,
}
export interface IAuthorization {
  delay: string,
  token: string,
  type: string,
}
export interface ILogin {
  app: IAppAuthorization,
  authorization: IAuthorization,
  user: IUserAuthorization,
}

export interface IUser {
  email: string,
  password: string
}
