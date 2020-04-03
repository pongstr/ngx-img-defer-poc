import { Directive, ElementRef, Input, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, Renderer2, HostListener  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
@Directive({
  selector: '[imgDefer]'
})
export class ImageDefer implements OnInit, AfterViewInit, OnDestroy {
  observer: IntersectionObserver;
  @Input() imgDeferSource: any;
  @Input() src:string;
  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  public ngOnInit(): void {
    if (this.imgDeferSource.regular) {
      this.renderer.setAttribute(this.element.nativeElement, 'src', this.imgDeferSource.regular);
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  loadImage(): Observable<any> {
    const { full, regular } = this.imgDeferSource
    return new Observable((subscriber) => {
      const img = new Image();
      img.src = regular;

      img.onload = () => {
        subscriber.next(img.src);
        subscriber.complete();
      }

      img.onerror = (err) => subscriber.error(err);
    })
  }
}
