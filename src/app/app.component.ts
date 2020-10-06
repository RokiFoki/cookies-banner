import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService, ICookiesConfig } from './cookies.service';
import { CookieBannerComponent } from './shared/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'cookie-banner';

  constructor(
    private cookiesService: CookiesService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.cookiesService.getCookiesConfig().then(config => {
      console.log(config);
      const modalRef = this.modalService.open(CookieBannerComponent, {
        ariaLabelledBy: 'accept cookies modal',
        size: 'lg',
        keyboard: false,
        backdrop: 'static'
      });

      modalRef.componentInstance.config = CookiesConfig.createFromICookiesConfig(config);
    });

  }
}

export class CookiesConfig implements ICookiesConfig {
  BannerId: number;
  Created: string;
  LastUpdated: string;
  accordian: {
    CategoryHeading: string;
    CategoryId: 11;
    CategoryText: string;
    ExtraSettings: string;
    IsMandatory: boolean;
    Localization: string;
    expanded: boolean;
    enabled: boolean;
    PluginList: {
      BlockingEnabled: boolean;
      ComplianceType: string;
      ComplianceTypeID: number;
      PluginDomain: string;
      cName: string;
      enabled: boolean;
    }[];
  }[];

  static createFromICookiesConfig(config: ICookiesConfig) {
    const cookiesConfig =  new CookiesConfig();

    // tslint:disable-next-line: forin
    for (const k in config) {
      cookiesConfig[k] = config[k];
    }

    cookiesConfig.accordian.forEach(a => {
      a.enabled = true;
      a.expanded = false;

      a.PluginList.forEach(p => p.enabled = true);
    });

    return cookiesConfig;
  }

  private constructor() { }

  public saveAll() {
    this.accordian.forEach(a => {
      a.PluginList.forEach(p => {
        p.enabled = true;
      });
      a.enabled = true;
    });
  }
}