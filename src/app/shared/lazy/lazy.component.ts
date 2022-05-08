import {
  Component,
  Injector,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.sass'],
})
export class LazyComponent<T> implements OnInit {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public container: ViewContainerRef | undefined;

  @Input()
  load: LoadChildrenCallback | undefined;
  @Input()
  component: Type<any> | undefined;
  @Input()
  hasPermission: boolean;

  constructor() {}

  ngOnInit(): void {
    this.loadModule();
  }

  async loadModule() {
    let module = await (<LoadChildrenCallback>this.load)();
    this.component = module.rootComponent;
    this.container?.createComponent(this.component);
  }
}
