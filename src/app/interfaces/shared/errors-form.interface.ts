export interface IErrorsForm {
  required?: boolean,
  email?: boolean,
  password?: boolean,
  password_confirmation?: boolean,
  restricted?: boolean,
  uniqEmail?: boolean,
  minlength?: {
    requiredLength: number,
    actualLength: number,
  } | null
}
