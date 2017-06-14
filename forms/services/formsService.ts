import { IRootScopeService } from 'angular';
import { PersistenceService } from '../persistence/services/persistenceService';
import { IFilledForm } from '../persistence/interfaces/iFilledForm';
import { IFormsService } from '../interfaces/iFormsService';
import { FormStatus } from '../constants/formStatus';
import { Services } from '../constants/service';
import { IForm } from '../interfaces/iForm';
import * as _ from 'underscore';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';



@Injectable()
export class FormsService {
    status;
    private form: any;
    constructor(
        private http: Http,
        private persistenceService: PersistenceService,
        private network: Network,
        private file: File
    ) {
        this.status = {
            sendingPending: false
        }
    }



    getFormSchema() {

        return this.http.get(this.file.externalDataDirectory + 'offline/form.json').map(res => res.json());

    }

    submitForm(formId: string, formData: any): FormStatus {
        if (this.network.type === 'none') {
            this.persistenceService.saveFormData(formId, formData, FormStatus.Pending);
            return FormStatus.Pending;
        }

        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        this.http.post(Services.FormUrl,
            formData, options);

        if (!this.status.sendingPending) {
            this.persistenceService.saveFormData(formId, formData, FormStatus.Sent);
        } else {
            this.form = this.getForm(formId);
            this.form.status = FormStatus.Sent;
            
        }

        return FormStatus.Sent;
    }

    getPendingForms() {
        return this.persistenceService.getFilledForms(FormStatus.Pending);
    }


    getSentForms() {
        return this.persistenceService.getFilledForms(FormStatus.Sent);
    }

    trySendPending(): void {
        //identifica se está no estado pending
        this.status.sendingPending = true;
        this.getPendingForms()
            .then((forms: IFilledForm[]) => {
                if (this.network.type !== 'none') {
                    var successfullySent = [];
                    const promises = _.map(forms,
                        (form) => {
                            form.status = FormStatus.Sent;
                            successfullySent.push(form);

                            return this.submitForm(form.id, form.data);

                        });
                    Promise.all(promises)
                        .then(() => {
                            this.status.sendingPending = false;
                            this.updateForms(successfullySent);
                        });
                }

            });
    }


    getForm(formId: string): Promise<IFilledForm> {
        return this.persistenceService.getForm(formId);
    }

    private updateForms(forms: IFilledForm[]) {
        return this.persistenceService.updateFormsData(forms);
    }

}