import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ICookiesConfig {
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
    PluginList: {
      BlockingEnabled: boolean;
      ComplianceType: string;
      ComplianceTypeID: number;
      PluginDomain: string;
      cName: string;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private readonly configUrl = 'https://fast-lowlands-95849.herokuapp.com/api/common/getBanner';

  constructor(private http: HttpClient) { }

  getCookiesConfig() {
    return this.http.get<ICookiesConfig>(this.configUrl).toPromise();
  }

  save(cookiesConfig: ICookiesConfig) {
    console.log('Saving:', cookiesConfig);
  }
}
