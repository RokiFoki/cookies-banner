import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CookiesConfig } from 'src/app/app.component';
import { CookiesService } from 'src/app/cookies.service';


@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieBannerComponent implements OnInit {
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  customize = false;

  @Input() config: CookiesConfig;

  constructor(
    public activeModal: NgbActiveModal,
    private cookiesService: CookiesService
    ) {}

  ngOnInit() {
  }

  acceptAll() {
    this.config.saveAll();

    this.save();
  }

  save() {
    this.cookiesService.save(this.config);
    this.activeModal.close(true);
  }

  toggleCustomize() {
    this.customize = !this.customize;
  }

  toggleAccordian(accordian: {expanded: boolean}) {
    accordian.expanded = !accordian.expanded;
  }

}
