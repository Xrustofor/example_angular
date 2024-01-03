import { Component, OnInit, } from "@angular/core";
import { LoadingService } from "../../services/loading/loading.service";
import { Observable } from "rxjs";

@Component({
  selector: 'adm-progressbar',
  templateUrl: 'progressbar.component.html',
  styleUrls: ['progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  public value: number = 0;
  public running: any;
  public show: boolean = false;
  public loading$: Observable<boolean>;

  constructor(
    public loading: LoadingService,
  ) {
    this.loading$ = loading.loading$
  }

  ngOnInit() {
    this.loading$.subscribe(loading => {
      if (!this.show && loading) {
        this.startProgress()
      }
    })
  }

  public emptyStyles: { [key: string]: string } = {
    // background: "",
  }

  public progressStyles: { [key: string]: string } = {
    // color: "",
    background: "#4ea079",
  };

  public startProgress(): void {
    this.show = true;
    this.running = setInterval(() => {
      this.loading$.subscribe(loading => {
        if (loading && this.value <= 90) {
          this.value++;
          return;
        }
        if (!loading && this.value < 100) {
          this.value = 100;
          return;
        }
        if (!loading && this.value >= 100) {
          this.stopProgress();
          this.show = false;
          this.value = 0
          return;
        }
      })
    }, 10);
  }
  public stopProgress(): void {
    if (this.running) {
      clearInterval(this.running);
      this.running = 0;
    }
  }
}


