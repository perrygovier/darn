import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Feed } from '../pages/feed/feed';
import { Live } from '../pages/live/live';

import {DarnService} from '../services/darn';

@NgModule({
  declarations: [
    MyApp,
    Feed,
    Live
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Feed,
    Live
  ],
  providers: [DarnService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
