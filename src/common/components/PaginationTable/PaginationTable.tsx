// base
import React, { useMemo, useState, useEffect, useRef } from 'react';

// packages
import { Table, Button, Select, Row, Col, Space } from 'antd';
import { TableProps, ColumnsType } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination';

// defines
const DEFAULT_PAGE_SIZE = 10;
const pageSizeRange = [10, 20, 50, 100];

interface PaginationTableProps<T> extends TableProps<T> {
  noAsync?: boolean;
  noIndex?: boolean;
  hideTotalElement?: boolean;
  columns: ColumnsType<T>;
  selectNum?: number;
  dataSource: T[];
  customLeft?: React.ReactNode;
  customRight?: React.ReactNode;
  showPageSize?: boolean;
  showRowSelection?: boolean;
  onChangePageSize?: (page: number, pageSize: number) => void;
  onChangeExpose?: (value: boolean) => void;
  onRowSelect?: (value: T[]) => void;
  onDownload?: () => void;
  noPage?:boolean;
  hideRow?:boolean;
}

interface Pagination extends PaginationProps {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
}

export const PaginationTable = <T extends {}>(
  props: PaginationTableProps<T>
) => {
  const {
    noAsync = false,
    noIndex = false,
    hideTotalElement = false,
    hideRow =false,
    columns,
    dataSource,
    customLeft,
    customRight,
    selectNum,
    showPageSize = true,
    showRowSelection = true,
    onChangePageSize,
    onChangeExpose,
    onRowSelect,
    onDownload,
    noPage,
    ...tableOptions
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const hasSelected = useMemo(() => {
    return selectedRowKeys.length > 0;
  }, [selectedRowKeys]);

  const pagination = useMemo<Pagination>(() => {
    return {
      total: 0,
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      showSizeChanger: false,
      ...tableOptions.pagination
    };
  }, [tableOptions.pagination]);

  const rowSelection = useMemo(() => {
    if (showRowSelection) {
      return {
        selectedRowKeys,
        onChange: (value: React.ReactText[], asd: any) => {
          setSelectedRowKeys(value as string[]);
          if (onRowSelect) {
            onRowSelect(asd);
          }
        },
        ...tableOptions.rowSelection
      };
    } else {
      return;
    }
  }, [tableOptions.rowSelection, selectedRowKeys, showRowSelection]);

  const handleChangePageSize = (pageSize: number) => {
    if (onChangePageSize) {
      onChangePageSize(1, pageSize);
    }
  };

  const dataSourceRef = useRef(dataSource);

  useEffect(() => {
    if (dataSourceRef.current.length === dataSource.length) {
      return;
    }

    if (pagination.total && dataSource.length === 0) {
      if (pagination.onChange) {
        pagination.onChange(
          pagination.current > 1 ? pagination.current - 1 : 1,
          pagination.pageSize
        );
      }
    }
  }, [pagination, dataSource]);

  useEffect(() => {
    dataSourceRef.current = dataSource;
  }, [dataSource]);

  return (
    <>
      {!hideTotalElement && pagination.total !== null && (
        <div
          style={{
            borderBottom: '1px solid #666',
            margin: '15px 0 10px 0'
          }}
        >
          <span>
            검색결과 총 {pagination.total ? pagination.total : 0} 건
            {selectNum !== undefined &&
              selectNum >= 0 &&
              ' |  ' + selectNum + '개 선택'}
          </span>
        </div>
      )}
      {!hideRow && (
      <Row style={{ marginBottom: 10 }} justify='space-between'>
        <Col style={{ marginRight: 10, float: 'left' }}>
          {onDownload && (
            <Button type='primary' onClick={onDownload}>
              전체 다운로드
            </Button>
          )}
          <Space size={5}>
            {onChangeExpose && (
              <>
                <Button
                  onClick={() => onChangeExpose(true)}
                  type='primary'
                  disabled={!hasSelected}
                >
                  선택 공개
                </Button>
                <Button
                  type='primary'
                  onClick={() => onChangeExpose(false)}
                  danger
                  disabled={!hasSelected}
                >
                  선택 비공개
                </Button>
              </>
            )}
            {customLeft}
          </Space>
        </Col>
        <Col style={{ float: 'right' }}>
          <Space size={5}>
            {customRight}
            {showPageSize && (
              <Select
                style={{ width: 150, marginLeft: 5 }}
                defaultValue={DEFAULT_PAGE_SIZE}
                value={pagination.pageSize ? pagination.pageSize : undefined}
                onChange={handleChangePageSize}
              >
                {pageSizeRange.map(size => (
                  <Select.Option key={size} value={size}>
                    {size}개씩 보기
                  </Select.Option>
                ))}
              </Select>
            )}
          </Space>
        </Col>
      </Row>) }

      <Table
        {...tableOptions}
        pagination={noPage ? false : pagination}
        rowSelection={rowSelection}
        columns={
          noIndex
            ? columns
            : [
                {
                  title: '순번',
                  dataIndex: 'index',
                  key: 'index',
                  width: '8%',
                  align: 'center'
                },
                ...columns
              ]
        }
        dataSource={
          !noAsync && dataSource.length
            ? dataSource.map((item, index) => {
                return {
                  ...item,
                  index:
                    1 + index + 
                    ((pagination.current * pagination.pageSize ) - 1 * pagination.pageSize)
                    ,
                      key: index
                };
              })
            : dataSource.map((item, index) => ({
                ...item,
                index: pagination.total - index,
                key: index
              }))
        }
      />
    </>
  );
};
