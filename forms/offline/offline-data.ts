import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Services } from '../constants/service';
import { OnInit } from '@angular/core';


@Injectable()
export class OfflineData {

    constructor(private file: File, private http: Http) {


    }

    getFormShema() {
        if (this.file.checkDir(this.file.externalDataDirectory, 'offline')) {
            this.file.createDir(this.file.externalDataDirectory, 'offline', true);
        }

        if (this.file.checkFile(this.file.externalDataDirectory + '/offline', 'form.json')) {
            this.file.createFile(this.file.externalDataDirectory + '/offline', 'form.json', true);

        }

        this.http.get(Services.FormUrl)
            .map(res => res.json())
            .subscribe((data) => {

                 this.file.writeExistingFile(this.file.externalDataDirectory + '/offline', 'form.json', data);
                console.log(data);
            });

    }
}