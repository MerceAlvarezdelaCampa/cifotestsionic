import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private i18nService: I18nService) {
    this.i18nService.setDefaultLanguage();
    // this.registerNotifications();
    // this.addListeners();
    // this.getDeliveredNotifications();
  }

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('METAG Registration token: ', token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('METAG Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('METAG Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('METAG Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

}
