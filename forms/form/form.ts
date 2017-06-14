import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormsService } from '../services/formsService';
import { IReferenceDataValue } from '../../../app/interfaces/IAppConfig';
import * as _ from 'underscore';
import * as $ from 'jquery';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";
import { FormStatus } from '../constants/formStatus';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'page-form',
    templateUrl: 'form.html'
})
export class FormPage {
    private formId: string;
    formContent: any;
    formExtension: string;
    pageName: string;
    isFromJsonConfig: boolean;
    formSchema: any;
    formConfig: any;
    formModel: any;
    form: any;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController,
        private formsService: FormsService,
        public params: NavParams) {

    }

    ionViewWillEnter() {


        this.formsService.getFormSchema()
            .subscribe((data) => {
                this.formSchema = data;
                this.isFromJsonConfig = true;
            });
    }

    submitForm(form): void {
        this.formId = UUID.UUID();
        this.form = form;

        var result;
        result = this.formsService.submitForm(this.formId, form);


        if (result === FormStatus.Pending) {
            let alert = this.alertCtrl.create({
                title: 'Pendente',
                subTitle: 'O formulário será submito assim que existir ligção à internet'
            });
            alert.present();
            this.goToHome();
            return;
        }
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'O formulário foi submetido com sucesso'
        });
        this.goToHome();

    }


    private getFormData(): any {
        const formData = $(`form`).serializeArray();
        let flattenedForm = {};
        _.forEach(formData, (input) => { flattenedForm[input.name] = input.value; });
        return flattenedForm;
    }

    goToHome() {
        this.navCtrl.pop();
    }




}