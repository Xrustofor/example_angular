import { AbstractControl, ValidationErrors } from "@angular/forms";

export type formParamType = (string | number | boolean | null | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[];