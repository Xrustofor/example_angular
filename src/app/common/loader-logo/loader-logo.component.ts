import { Component, Input } from '@angular/core';
import { Utility } from "../../utility";

@Component({
  selector: 'adm-loader-logo',
  templateUrl: './loader-logo.component.html',
  styleUrls: ['./loader-logo.component.scss']
})
export class LoaderLogoComponent {
  protected getUrl = Utility.instance().getUrl;
  private readonly _sizes = {
    small: '40px',
    big: '80px'
  }

  width = this._sizes['big'];
  height = this._sizes['big'];
  @Input() set size(value: 'small' | 'big') {
    switch (value) {
      case 'small':
        this.width = this._sizes[value];
        this.height = this._sizes[value];
        break;
      case 'big':
        this.width = this._sizes[value];
        this.height = this._sizes[value];
        break;
    }
  }

  @Input() loading: boolean;
}
