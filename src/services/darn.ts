import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import X2JS from "x2js";

@Injectable()
export class DarnService {  http: Http;
  data: any;
  posts;
  private darnUrl: string;

  private require: any

  constructor(http: Http) {
    this.http = http;
    this.posts = [];
    this.darnUrl = '/darn?series=show-podcasts&feed=rss2';
    // this.darnUrl = 'http://darnwi.com?series=show-podcasts&feed=rss2';
  }

  get(page?:number) {
    let url = this.darnUrl;
    var self = this;
    if (page) {
      url += '&paged=' + (page + 1);
    } else {
      this.data = [];
    }

    return this.http
      .get(url)
      .map(mapXML);
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
      mp3: item.enclosure && item.enclosure._url ? item.enclosure._url : null,
      tags: item.category
    });
  })

  return items;
}
