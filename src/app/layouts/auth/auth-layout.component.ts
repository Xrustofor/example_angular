import {Component, OnInit} from "@angular/core";
import { Utility } from "src/app/utility";

@Component({
  selector: 'adm-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit{
  protected getUrl = Utility.instance().getUrl;
  ngOnInit() {
  }
}
