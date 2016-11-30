import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import X2JS from "x2js";

@Injectable()
export class DarnService {  http: Http;
  data: any;
  private darnUrl: string;

  private require: any

  constructor(http: Http) {
    this.http = http;
    this.data = null;
    this.darnUrl = '/darn?series=show-podcasts&feed=rss2';
    // this.darnUrl = 'http://darnwi.com?series=show-podcasts&feed=rss2';

  }

  getAll() {
    return this.http
      .get(this.darnUrl)
      .map(mapXML);
  }

  getData() {
    return this.data;
  }
 }

function mapXML(data) {
  let xml = data.text();
  let x2js = new X2JS();

  let response = x2js.xml2js(xml);

  let items = [];

  response.rss.channel.item.forEach(item => {
    items.push({
      title: item.title,
      description: item.description,
      link: item.link,
      mp3: item.enclosure && item.enclosure._url ? item.enclosure._url : null
    })
  })

  return items;
}
