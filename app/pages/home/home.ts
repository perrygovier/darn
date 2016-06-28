import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DarnService} from '../../services/darn';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController, darn: DarnService) {
    darn.retrieveData()

  }
}
