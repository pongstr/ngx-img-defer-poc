import { OnInit, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators'
import { MediaService } from './media.service';
import { Breakwater } from './app.types';
import { placeholder } from './app.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: []
})
export class AppComponent implements OnInit {

  private readonly isDestroyed$ = new Subject<void>();
  public collection: Breakwater.ImageModel[] = [];

  constructor(
    private media: MediaService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.init();
  }

  public get placeholder(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(placeholder);
  }

  private getImages(): Observable<Breakwater.ImageModel[]> {
    return this.media.fetchCollection().pipe(
      takeUntil(this.isDestroyed$),
      map((res) => res.body));
  }

  private init(): void {
    this.getImages()
      // .pipe((takeUntil(this.isDestroyed$)))
      .pipe(take(1))
      .subscribe((data: any) => (this.collection = [].concat(data.results)));
  }
}
