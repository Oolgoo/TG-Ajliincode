// base
import React from 'react';

// packages
import { Select } from 'antd';
import { SelectValue, SelectProps } from 'antd/lib/select';

interface SearchSelectBoxProps extends SelectProps<string> {
  // value 값 넘길 시 에러 발생
  //value: string;
  searchTypes: Array<{ key: string; name: string }>;
  onChange: (e: SelectValue) => void;
}

export const SearchSelectBox = (props: SearchSelectBoxProps) => {
  const { searchTypes, onChange, value, ...rest } = props;

  return (
    <Select
      onChange={onChange}
      //value={value}
      getPopupContainer={(trigger: HTMLElement) => {
        let isSearch = false;

        let _trigger = trigger;

        while (!isSearch) {
          if (_trigger.parentElement) {
            _trigger = _trigger.parentElement;
          }

          if (_trigger.classList.contains('ant-descriptions-item-content')) {
            _trigger = _trigger.querySelector('.ant-row') as HTMLElement;

            isSearch = true;
          }
        }

        return _trigger || document.body;
      }}
      {...rest}
    >
      {searchTypes.map((item, index) => {
        return (
          <Select.Option key={index} value={item.key}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
