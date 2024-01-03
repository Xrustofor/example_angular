export interface IApiLabelRequireValue {
  label: string,
  require: boolean,
  value: string | null,
}

export interface IProperty<TValue> {
  [property: string]: TValue,
}

export interface IKeyValue<TKey, TValue> {
  key: TKey,
  value: TValue,
}

export interface IKeyValueData<TKey, TValue, TData> extends IKeyValue<TKey, TValue> {
  id: TData,
  code: TData,
  list: TData,
}

export interface IPropertyString extends IProperty<string> { }

export interface IPropertyAny extends IProperty<string | number | boolean> { }

export interface IKeyValueString extends IKeyValue<string, string> { }