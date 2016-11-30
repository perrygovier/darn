import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {DarnService} from '../../services/darn';

import {Howl} from 'howler';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class Feed {
  posts;
  isLoading;
  activeSoundId;

  constructor(public navCtrl: NavController, darn: DarnService) {
    this.posts = [];


    darn.getAll().subscribe(
      items => {
        this.posts = items
      },
      e => console.error(e),
      () => this.isLoading = false
    )
  }

  play(i) {
    this.stop(this.activeSoundId);
    this.activeSoundId = i;
    if (!this.posts[i].howl) {
      var self = this;
      this.posts[i].howl = new Howl({
        src: [this.posts[i].mp3],
        html5: true,
        onplay: function() {
          console.log('This track is ' + self.posts[i].howl.duration() + ' seconds long');
          // this.sound.length = Math.round(this.sound.duration());
          // console.log(this.sound.length);
        }
      });
    }

    this.posts[i].howl.play();
    this.posts[i].isPlaying = true;
  }

  stop(i) {
    if (this.activeSoundId === undefined) {
      return;
    }

    if (this.posts[this.activeSoundId].howl) {
      this.posts[this.activeSoundId].howl.stop();
    }
    this.posts[this.activeSoundId].isPlaying = false;
  }
}
