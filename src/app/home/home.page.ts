import { Component } from '@angular/core';
import { WebIntent } from '@ionic-native/web-intent/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private webIntent: WebIntent) { }

  payWithUPI() {
    const tid = this.getRandomString();
    const orderId = this.getRandomString();
    const totalPrice = 1.00;
    const UPI_ID = '******';
    const UPI_NAME = 'Ratikanta Pradhan';
    const UPI_TXN_NOTE = 'TEST TXN';
    // tslint:disable-next-line: max-line-length
    let uri = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&tid=${tid}&am=${totalPrice}&cu=INR&tn=${UPI_TXN_NOTE}&tr=${orderId}`;
    uri = uri.replace(' ', '+');
    (window as any).plugins.intentShim.startActivityForResult(
      {
        action: this.webIntent.ACTION_VIEW,
        url: uri,
        requestCode: 1
      }, intent => {
        if (intent.extras.requestCode === 1 &&
            intent.extras.resultCode === (window as any).plugins.intentShim.RESULT_OK &&
            intent.extras.Status &&
            (((intent.extras.Status as string).toLowerCase()) === ('success'))) {
          this.paymentSuccess(orderId, 'UPI');
        } else {
          alert('payment failed');
        }
      }, err => {
        alert('error ' + err);
      });
  }

  getRandomString() {
    const len = 10;
    const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  paymentSuccess(orderId: string, paymentMethod: string) {
    alert(`Payment successful Order Id ${orderId} payment method ${paymentMethod}`);
  }

}
