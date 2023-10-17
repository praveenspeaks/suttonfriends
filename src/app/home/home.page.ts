import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;
  content_visibility = '';
  values:any;
  body:any;

  constructor() {}

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();      
      this.body = document.querySelector('body');
      if(this.body != null){
        this.body.classList.add('scanner-active');
      }
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();      
      BarcodeScanner.showBackground();      
      if(this.body != null){
        this.body.classList.remove('scanner-active');
      }
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        this.values = this.scannedResult.split(",", 6); 
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }    
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.body = document.querySelector('body');
    if(this.body != null){
      this.body.classList.remove('scanner-active');
    }
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
      this.stopScan();
  }

}
