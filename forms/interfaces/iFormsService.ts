import { IForm } from '../interfaces/iForm';
import { IFilledForm } from '../persistence/interfaces/iFilledForm';
import { FormStatus } from '../../../constants/formStatus';

export interface IFormsService {
    status: {
        sendingPending: boolean;
    }

    submitDraft(formData: IFilledForm);
    submitForm(menuTitle: string, formName: string, formData: any);
    getPendingForms();
    getSentForms();
    trySendPending(): void;
    getFormContent();

    saveDraftForm(menuTitle: string, formName: string, formData: any);
    getAllDrafts();
    deleteDraft(draft: any);
    updateDraft(draft: any);

}