import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { iconsSVG } from '../../../../assets/icons/svg-icons'
import { SVGIcon } from "@progress/kendo-svg-icons";
import { BUTTON_COLOR, GET_BUTTON_COLOR } from "../button.interface";

@Component({
  selector: 'adm-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() bg: BUTTON_COLOR = 'transparent';
  @Input() br: BUTTON_COLOR = 'transparent';
  @Input() color: BUTTON_COLOR = 'white';

  @Input() disabled = false;
  @Input() prependIcon = ''
  @Input() dev: boolean;
  @Input() haveContent: boolean;
  @Input() maxWidth: string | number;
  @Input() type: 'button' | 'submit' = 'button'
  @Output() onClick = new EventEmitter<void>();
  public preIcon: SVGIcon | null = null;

  constructor(private elRef: ElementRef) { }

  public getColor = GET_BUTTON_COLOR;

  ngOnInit() {
    const candidate: string | undefined = Object.keys(iconsSVG).find(key => key === this.prependIcon);
    if (candidate) {
      this.preIcon = iconsSVG[candidate] as SVGIcon;
    }
  }

  ngAfterContentInit() {
    this.haveContent = !!this.elRef.nativeElement.querySelector('.text').childNodes.length;
  }
}