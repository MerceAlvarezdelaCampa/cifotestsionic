import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  result: any;

  constructor(public platform: Platform) {}

  async startScan() {
    console.log(this.platform.is('ios'), this.platform.is('android'));
    if (this.platform.is('ios') || this.platform.is('android')) {
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });
    
      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();
    
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    
      // if the result has content
      if (result.hasContent) {
        this.result = result.content; // log the raw scanned content
      }
    }
  };

}
