import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notificationOptions: any = {
    timeOut: 5000,
    showProgressBar: false
  }
}
