import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(private translateService: TranslateService) { }

  setDefaultLanguage() {
    this.translateService.setDefaultLang('es');
  }

  setLanguage(lng: string) {
    return this.translateService.use(lng);
  }

}
