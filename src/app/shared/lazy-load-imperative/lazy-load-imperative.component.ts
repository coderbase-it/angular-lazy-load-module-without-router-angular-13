import {
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-lazy-load-imperative',
  templateUrl: './lazy-load-imperative.component.html',
  styleUrls: ['./lazy-load-imperative.component.sass'],
})
export class LazyLoadImperativeComponent implements OnInit {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public container: ViewContainerRef | undefined;

  @Input()
  load: LoadChildrenCallback | undefined;
  component: Type<any> | undefined;

  constructor() {}

  ngOnInit(): void {
    this.loadModule().subscribe((module) =>
      this.container.createComponent(module.rootComponent)
    );
  }

  loadModule(): Observable<any> {
    return from(Promise.resolve((this.load as LoadChildrenCallback)())).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error(err));
      })
    );
  }
}
