import { FieldType } from '../utilities/enums';

export class FormDataModel {
  public formName!: string;
  public description!: string;
  public fieldArray!: FieldDataModel[];
}

export class FieldDataModel {
  fieldType!: FieldType;
  fieldLabel!: string;
  fieldDescription!: string;
  fieldValue!: any;
}
