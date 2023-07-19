import { FormInstance } from 'antd/lib/form';

export interface SearchType {
  key: string;
  name: string;
}

export interface CustomFormItem {
  title: string;
  name: string;
  key?: string;
  render: (form: FormInstance) => React.ReactNode;
}
