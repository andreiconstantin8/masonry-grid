import {Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-when-visible',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="showElement && templateRef" [ngTemplateOutlet]="templateRef">
    </ng-container>
  `
})
export class ShowWhenVisibleComponent implements OnInit, OnDestroy{
  @ContentChild(TemplateRef<any>)
  templateRef!: TemplateRef<any>
  @Input()
  public rootMarginForObserver: number = 0
  @Input()
  @HostBinding('style.min-height.px')
  public minHeight: number = 100;

  protected showElement: boolean = false
  private observer!: IntersectionObserver
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const options = {
      root: document,
      rootMargin: this.rootMarginForObserver + 'px',
      threshold: 0,
    };
    this.observer = new IntersectionObserver(this.addToView.bind(this), options);
    this.observer.observe(this.elementRef.nativeElement)
  }
  addToView(data: IntersectionObserverEntry[]) {
    if(data[0].isIntersecting) {
      this.showElement = true
      this.observer.disconnect()
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect()
  }

}
