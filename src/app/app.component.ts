import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LazyLoader';
  view = false;
  constructor() {}
  public loadView() {
    return import('./modules/view/view.module').then((x) => x.ViewModule);
  }
  public loadProfile() {
    return import('./modules/profile/profile.module').then(
      (x) => x.ProfileModule
    );
  }
}
