import { IPersistenceService } from '../interfaces/iPersistenceService';
import { IFilledForm } from '../interfaces/iFilledForm';
import { FormStatus } from '../../constants/formStatus';
import { IForm } from '../../interfaces/iForm';
import { IReferenceData } from '../../appConfig/IAppConfig';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import * as loki from "lokijs";
import { Platform } from "ionic-angular";
import * as _ from 'underscore';
import * as localforage from "localforage";
import * as LokiCordovaFSAdapter from '../../../node_modules/loki-cordova-fs-adapter/src/loki-cordova-fs-adapter.es6';



declare var require: any;
//declare var LokiCordovaFSAdapter: any;

@Injectable()
export class PersistenceService implements IPersistenceService {

    private db: any;
    private forms: LokiCollection<IForm>;
    private formsData: LokiCollection<IFilledForm>;
    private referenceData: LokiCollection<IReferenceData>;


    constructor() { }

    initDb() {
       // const adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            this.db = new loki('formsDb',
                {
                    autosave: true,
                    autosaveInterval: 1000,
                    autoloadCallback: this.loadHandler,
                    //adapter: adapter
                });
        
    }

    loadHandler() {
        this.forms = this.db.getCollection('forms') as LokiCollection<IForm>;
        this.formsData = this.db.getCollection('formsData') as LokiCollection<IFilledForm>;
        this.referenceData = this.db.getCollection('referenceData') as LokiCollection<IReferenceData>;
    }

    openDb() {
        this.initDb();


        //create collections if they don't exist
        if (!this.forms) {
            this.forms = this.db.addCollection('forms') as LokiCollection<IForm>;
        }

        if (!this.formsData) {
            this.formsData = this.db.addCollection('formsData') as LokiCollection<IFilledForm>;
        }

        if (!this.referenceData) {
            this.referenceData = this.db
                .addCollection('referenceData') as LokiCollection<IReferenceData>;
        }


    }


    closeDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.close(resolve);
        });
    }

    

    clearAllCollections() {
        if (this.db) this.db.collections.forEach((coll) => coll.removeDataOnly());
    }


    //Forms
    getForm(formId: string): Promise<IFilledForm> {
        return Promise.resolve(this.formsData.findOne({ 'id': { '$eq': formId } }));
    }
    saveForm(form: IForm): Promise<any> {
        return new Promise((resolve, reject) => {
            const savedForm = this.forms.findOne({ 'id': { '$eq': form.id } }) as IForm;
            if (!savedForm) this.forms.insert(form);
            else {
                savedForm.content = form.content;
                this.forms.update(savedForm);
            }
            resolve();
        });
    }

    saveForms(forms: IForm[]): Promise<any> {
        return Promise.all(_.map(forms, form => this.saveForm(form)));
    }

    saveFormData(formId: string, formData: any, formStatus: FormStatus): Promise<any> {
        const newForm: IFilledForm = {
            id: formId,
            status: formStatus,
            data: formData,
            created: new Date()
        };

        return new Promise((resolve) => {
            this.formsData.insert(newForm);
            resolve();
        });
    }

    ////Promise.resolve => $q.when
    updateFormsData(drafts: IFilledForm[]): Promise<any> {
        return new Promise((resolve) => {
            this.formsData.update(drafts);
            resolve();
        });
    }

    getFilledForms(status: FormStatus): Promise<IFilledForm[]> {
        return Promise.resolve(this.formsData.chain().find({ status: status }).data());
    }

    public getReferenceData(name: string): Promise<IReferenceData> {
        return Promise.resolve(this.referenceData.findOne({ name: name }));
    }
}