// base
import React, { useCallback, useEffect, useRef, useState } from 'react';

// modules
import {
  Descriptions,
  Form,
  Button,
  Row,
  Col,
  Input,
  FormInstance,
  Select
} from 'antd';

import { Dayjs } from 'dayjs';

import styled from 'styled-components';

// components
import { SearchDatePicker } from './SearchDatePicker';

import { CustomFormItem, SearchType } from './SearchBarTypes';

// components
import { SearchSelectBox } from './SearchSelectBox';

import { SelectValue } from 'antd/lib/select';
import { CLIENT_DATE_FORMAT } from '../../../enums';
import { searchTypeData } from '../../../lib';

const StyledSearchBar = styled.div`
  position: relative;
  background-color: white;

  .ant-form-item {
    margin-bottom: 0;
  }

  .search-filter-title {
    font-size: 12px;
    color: #999999;
  }

  .ant-space-item {
    margin-bottom: 0 !important;
  }

  .ant-descriptions {
    &-item {
      &-label {
        min-width: 100px;
      }
    }
  }

  .ant-select-open {
  }

  .ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: #d9d9d9 !important;
  }

  .ant-form-item-explain {
    display: none;
  }
`;

interface SearchBarProps {
  customForm?: FormInstance;
  onReset?: () => void;
  onSearch: (values: { [key: string]: any }) => void;
  searchTypes?: SearchType[];
  initialSearchTypeKey?: string;
  customFormItems?: CustomFormItem[];
  isSearchDate?: boolean;
  searchDateType?: string;
  isMini?: boolean;
}

export const SearchBar = (props: SearchBarProps) => {
  const {
    customForm,
    onReset,
    onSearch,
    searchTypes = [],
    initialSearchTypeKey,
    customFormItems,
    isSearchDate = true,
    searchDateType,
    isMini,
  } = props;

  const formRef = useRef(null) // set initial ref as null

  const [form] = Form.useForm();

  const handleReset = useCallback(() => {
    form.resetFields();

    if (onReset) {
      onReset();
    }
  }, [onReset, form]);

  const handleSearch = useCallback((values: any) => {
      if (values['dateRange']) {
        values['dateRange'] = values['dateRange'].map((dayjs: Dayjs) =>
          dayjs.format(CLIENT_DATE_FORMAT)
        );
      }

      if (!values['key'] || !values['word']) {
        delete values['key'];
        delete values['word'];
      }

      if (!values['dateType']) {
        delete values['dateType'];
      }

      onSearch(values);
    },
    [onSearch]
  );

  const handleSelecDateType = (value: SelectValue) => {
    form.setFieldsValue({
      dateType: value
    });
  };

  const handleSelectChange = (value: SelectValue) => {
    form.setFieldsValue({
      selectType: value
    });
  };

  if (searchTypes && initialSearchTypeKey) {
    form.setFieldsValue({
      key: initialSearchTypeKey
    });
  }

  useEffect(() => {
    if (isSearchDate) {
      form.setFieldValue('dateType', searchTypeData.filter(e => e.searchDate === searchDateType)[0].initialValue);
    }
  }, [])

  return (
    <StyledSearchBar id='SearchBar'>
      <Form
        key='searchForm'
        form={customForm ? customForm : form}
        onFinish={value => {
          handleSearch(value);
        }}
      >
        <Descriptions bordered column={24}>
          {isSearchDate && (
            <>
              <Descriptions.Item label='검색기간' span={24}>
                <Row>
                  <Form.Item name='dateType' style={{ width: '8rem', marginRight: 5 }}>
                    <Select
                      placeholder='검색일자 타입'
                      options={searchTypeData.filter(e => e.searchDate === searchDateType)[0].searchList}
                      value={form.getFieldValue('dateType')}
                      onSelect={handleSelecDateType}
                    />
                  </Form.Item>
                  <Form.Item name='dateRange'>
                    <SearchDatePicker />
                  </Form.Item>
                </Row>
              </Descriptions.Item>
            </>
          )}
          {searchTypes.length !== 0 && !isMini && (
            <Descriptions.Item label='키워드 검색' labelStyle={{ width: 200 }} span={24}>
              <Row gutter={10}>
                <Col span={4}>
                  <Form.Item name='key'>
                    <SearchSelectBox
                      placeholder='검색어 타입'
                      searchTypes={searchTypes}
                      onChange={handleSelectChange}
                      value={form.getFieldValue('key')}
                    />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item name='word'>
                    <Input placeholder={'검색어를 입력해주세요.'} />
                  </Form.Item>
                </Col>
              </Row>
            </Descriptions.Item>
          )}
          {customFormItems ?
            customFormItems.map((item, index) => (
              <Descriptions.Item key={index} label={item.title} span={24}>
                <Form.Item name={item.name} style={{margin:0}}>{item.render(form)}</Form.Item>
              </Descriptions.Item>
            )) : (<></>)}

          {searchTypes.length !== 0 && isMini && (
            <Descriptions.Item label='키워드 검색' labelStyle={{ width: 120 }} span={24}>
              <Row gutter={10}>
                <Col span={6}>
                  <Form.Item name='key'>
                    <SearchSelectBox
                      placeholder='검색어 타입'
                      searchTypes={searchTypes}
                      onChange={handleSelectChange}
                      value={form.getFieldValue('key')}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name='word'>
                    <Input placeholder={'검색어를 입력해주세요.'} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <div style={{textAlign:'center'}}>
                    <Form.Item>
                      <Button
                        size='middle'
                        htmlType='submit'
                        type='primary'
                        style={{ width: 60 }}
                      >
                        검색
                      </Button>
                      <Button size='middle' style={{ width: 70, marginLeft: 5 }} onClick={handleReset}>
                        초기화
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Descriptions.Item>
          )}
        </Descriptions>

        {!isMini && (
          <Form.Item>
            <div style={{ textAlign: 'center', marginTop: 30 }}>
              <Button
                size='large'
                htmlType='submit'
                type='primary'
                style={{ width: 124, marginTop: 5, marginRight: 5 }}
              >
                검색
              </Button>
              <Button size='large' style={{ width: 124 }} onClick={handleReset}>
                초기화
              </Button>
            </div>
          </Form.Item>
        )}
        <Form.Item hidden>
          <Input hidden name='token' />
        </Form.Item>
      </Form>
    </StyledSearchBar>
  );
};
