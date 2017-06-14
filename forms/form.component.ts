import { Injectable } from '../../@angular/core/index';
import { Services } from '../forms/constants/service';
import { FormPage } from '../forms/form/form';
import { SentPage } from '../forms/sent/sent';
import { PendingPage } from '../forms/pending/pending';
import { PersistenceService } from '../forms/persistence/services/persistenceService';
import { Network } from '../../ionic-native/dist/esm/index';
import { FormsService } from '../forms/services/formsService';
import { OfflineData } from '../forms/offline/offline-data';

@Injectable()
export class Forms {


    worpressPages: any;
    menuFormOpen: boolean = false;

    constructor(public persistence: PersistenceService,
        public formsService: FormsService,
        public offline: OfflineData) {

        this.persistence.openDb();
        this.offline.getFormShema();
        Network.onConnect().subscribe(() => {
            this.formsService.trySendPending();
        });
    }

    getFormsPages(){
        return [
            { title: 'FORMS', component: FormPage },
            { title: 'SENT', component: SentPage },
            { title: 'PENDING', component: PendingPage }
        ];
    }
}

