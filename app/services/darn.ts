import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import * as xml2js from 'xml2js';

@Injectable()
export class DarnService {
  http: Http;
  data: any;
  private darnUrl: string;

  private require: any

  constructor(http: Http) {
    this.http = http;
    this.data = null;
    this.darnUrl = '/darn?series=show-podcasts&feed=rss2';

  }

  retrieveData() {
    this.http.get(this.darnUrl)
    .subscribe(data => {
      let xml = data.text();
      xml2js.parseString(xml, (err, test) => {
        this.data = test;

        console.log(test);
      });
    });
  }

  getData() {
    return this.data;
  }
}
