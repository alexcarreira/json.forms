import { FormStatus } from '../../constants/formStatus';

export interface IFilledForm {
    id: string;
    status: FormStatus;
    data: any;
    created: Date;
}