import { Component, Input } from '@angular/core';

@Component({
  selector: 'adm-loader-skeleton',
  templateUrl: './loader-skeleton.component.html',
  styleUrls: ['./loader-skeleton.component.scss']
})
export class LoaderSkeletonComponent {
  @Input() hostHeight = 'auto';
  @Input() itemHeight = '10px';
  @Input() padding = '0px';
  @Input() gap = '0px';
  @Input() count = 1;

  @Input() loading: boolean;

  getLoadingCount() {
    return Array(this.count).fill(0).map((x, i) => i);
  }
}
