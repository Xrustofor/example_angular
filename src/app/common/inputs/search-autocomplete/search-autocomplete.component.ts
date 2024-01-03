import { Component, ViewChild, AfterViewInit, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { iconsSVG } from "../../../../assets/icons/svg-icons";
import { SVGIcon } from "@progress/kendo-svg-icons";
import { animate } from "@angular/animations";
import { IKeyValue, IPropertyString } from 'src/app/interfaces/global/global.interfaces';
import { debounceTime, tap } from "rxjs/operators";

@Component({
  selector: 'adm-search-autocomplete',
  templateUrl: 'search-autocomplete.component.html',
  styleUrls: ['search-autocomplete.component.scss'],
})
export class SearchAutocompleteComponent implements AfterViewInit, OnInit {
  @Input() width = 300;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() loading = false;
  @Input() items: IKeyValue<string, any>[] | null = null;
  @Input() item: any;
  @Input() isPopup = true;
  @Output() onInput = new EventEmitter();
  @Output() select = new EventEmitter<string>();
  @Output() value = new EventEmitter<string>();
  @Input() valueField = '';


  public searchIcon = iconsSVG['search'] as SVGIcon;
  @ViewChild('autocomplete', { static: false })
  public autocomplete: AutoCompleteComponent;

  ngOnInit() { }

  ngAfterViewInit() {
    this.autocomplete.filterChange
      .asObservable()
      .pipe(
        tap(() => (this.autocomplete.loading = this.loading)),
        debounceTime(300),
      )
      .subscribe(value => {
        this.onInput.emit(value);
      })
  }
  protected readonly animate = animate;

  async change($event: string) {
    this.select.emit($event)
  }

  close() {
    this.items = null
    this.item = ''
  }
}
