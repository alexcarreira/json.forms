import { NgModule, ErrorHandler } from '../../@angular/core/index';
import { IonicApp, IonicModule, IonicErrorHandler } from '../../ionic-angular/index';
import { Forms } from '../forms/form.component';
import { Api } from '../../src/service/api';
import { OfflineData } from '../forms/offline/offline-data';
import { Shared } from '../../src/service/shared';
import { FormPage } from '../forms/form/form';
import { SentPage } from '../forms/sent/sent';
import { PendingPage } from '../forms/pending/pending';
import { FormsService } from '../forms/services/formsService';
import { PersistenceService } from '../forms/persistence/services/persistenceService';
import { Network } from '../../@ionic-native/network/index';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";
import { BrowserModule } from "../../@angular/platform-browser/index";
import { File } from '../../@ionic-native/file/index';
import { MyApp } from '../../src/app/app.component';

@NgModule({
    declarations: [
        FormPage,
        SentPage,
        //DraftPage,
        PendingPage
    ],
    imports: [
        SchemaFormModule,
        BrowserModule,
        IonicModule.forRoot(FormPage),
        IonicModule.forRoot(SentPage),
        IonicModule.forRoot(PendingPage)
    ],
    exports: [
        FormPage,
        SentPage,
        PendingPage
    ],
    providers: [OfflineData,File, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }, Network, PersistenceService, FormsService, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class FormsModule { }