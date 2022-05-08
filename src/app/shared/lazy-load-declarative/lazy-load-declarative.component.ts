import { Component, Input, OnInit, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lazy-load-declarative',
  templateUrl: './lazy-load-declarative.component.html',
  styleUrls: ['./lazy-load-declarative.component.sass'],
})
export class LazyLoadDeclarativeComponent implements OnInit {
  @Input()
  load: LoadChildrenCallback | undefined;

  component?: Observable<Type<any>>;

  constructor() {}

  ngOnInit(): void {
    this.component = this.loadModule();
  }

  loadModule(): Observable<Type<any>> {
    return from(Promise.resolve((this.load as LoadChildrenCallback)())).pipe(
      switchMap((module) => from(Promise.resolve(module.rootComponent)))
    );
  }
}
