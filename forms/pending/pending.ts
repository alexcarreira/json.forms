import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormsService } from '../services/formsService';

@Component({
    selector: 'page-pending',
    templateUrl: 'pending.html'
})
export class PendingPage {

    private pendingList;
    private length: number;
    constructor(public navCtrl: NavController,
        private formsService: FormsService) {

    }


    ionViewWillEnter() {
        this.formsService.getPendingForms()
            .then((forms) => {
                this.pendingList = forms;
                this.length = forms.length;
            });
    }

}