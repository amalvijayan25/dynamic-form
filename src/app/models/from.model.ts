import { FieldType } from '../utilities/enums';

export class FormDataModel {
  public formID!: number;
  public formName!: string;
  public description!: string;
  public fieldArray!: FieldDataModel[];
}

export class FieldDataModel {   
  fieldID!: number;
  fieldType!: FieldType;
  fieldLabel!: string;
  fieldDescription!: string;
  fieldValue!: any;
}
