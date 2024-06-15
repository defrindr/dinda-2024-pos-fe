export interface ISelect2Option {
  value: string | number
  label: string
}

export interface ISelect2 {
  id: string
  label?: string
  onSelect: any
  search?: any
  hasSearch?: boolean
  placeholder?: string
  selected: null | ISelect2Option
  options: ISelect2Option[]
}

export interface IInputField {
  placeholder?: string
  type?: string
  label: string
  icon?: string
  modelValue: any
  rows?: number
}
