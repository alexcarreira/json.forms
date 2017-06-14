import { IFilledForm } from '../interfaces/iFilledForm';
import { FormStatus } from '../../constants/formStatus';
import { IForm } from '../../interfaces/iForm';
import { IReferenceData } from '../../appConfig/IAppConfig';

export interface IPersistenceService {
    openDb();
    closeDb(): Promise<any>;
    clearAllCollections(): void;

    getReferenceData(name: string): Promise<IReferenceData>;
    //Forms
    getForm(formName: string): Promise<IFilledForm>;
    saveForm(form: IForm): Promise<any>;
    saveForms(forms: IForm[]): Promise<any>;
    saveFormData(menuTitle: string, formName: string, formData: any, formStatus: FormStatus): Promise<any>;
    getFilledForms(status: FormStatus): Promise<IFilledForm[]>;
}