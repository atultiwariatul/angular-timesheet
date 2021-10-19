import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-timesheet';

  profile() {
    console.log("Profile Clicked");
  }
  settings() {
    console.log("Settings Clicked");
  }
}
