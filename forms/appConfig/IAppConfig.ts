interface IAppConfig {

    hasAuthMenu(): void;
    callApi(): void;


}

export interface IReferenceDataValue {
    text: string;
    value: any;
}

export interface IReferenceData {
    name: string;
    data: IReferenceDataValue[];
    src: string;
    validity?: number;
}