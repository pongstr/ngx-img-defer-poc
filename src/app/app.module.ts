import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { interceptorProvider } from './http.service';
import { MediaService } from './media.service';
import { ImageDefer } from './img.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) ],
  exports:      [ ImageDefer ],
  declarations: [ AppComponent, ImageDefer ],
  bootstrap:    [ AppComponent ],
  providers:    [ interceptorProvider(), MediaService ]
})
export class AppModule { }
