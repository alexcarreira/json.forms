import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsService } from '../services/formsService';

@Component({
    selector: 'page-sent',
    templateUrl: 'sent.html'
})
export class SentPage {

    private sentList;
    private length;
    constructor(public navCtrl: NavController,
        private formsService: FormsService) {

        

    }

    ionViewWillEnter() {
        this.formsService.getSentForms()
            .then((forms) => {
                this.sentList = forms;
                this.length = forms.length;
            });
    }

}