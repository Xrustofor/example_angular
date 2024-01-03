import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'adm-page-error',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
