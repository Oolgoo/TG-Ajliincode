import React from "react";
import { DatePicker, Row, Col, Button, Select } from 'antd';

import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

type searchDateRange = [Dayjs, Dayjs];

const { RangePicker } = DatePicker;

interface SearchDatePickerProps {
  recentTwoWeek?: boolean;
  recentThreeDay?: boolean;
  value?: searchDateRange;
  onChange?: (value: searchDateRange) => void;
}

export const SearchDatePicker = (props: SearchDatePickerProps) => {
  const { recentThreeDay, recentTwoWeek, value , onChange } = props;
  
  const handleChange = (values: searchDateRange) => {
    if (onChange) {
      onChange(values);
    }
  };

  const  handleChangeShortcut = (day : string) => {
    let clickDate:searchDateRange;

    if (onChange) {
    switch(day) {
      case 'today' :
        const todayStr = [dayjs(), dayjs()];
        clickDate = todayStr as searchDateRange;
        onChange(clickDate);
        break;
      case 'week' :
        const weekStr = [dayjs().add(-7, 'd'), dayjs()];
        clickDate = weekStr as searchDateRange;
        onChange(clickDate);
        break;
      case 'month' :
        const monthStr = [dayjs().add(-30, 'd'), dayjs()];
        clickDate = monthStr as searchDateRange;
        onChange(clickDate);
        break;
      default:
        break;
    }
    
  }
}
  const disabledDate = () => {
    return false;
  };

  return (
    <Row gutter={10}>
      
      <Col>
        <RangePicker
          placeholder={['검색시작일', '검색종료일']}
          locale={locale}
          disabledDate={disabledDate}
          onChange={e =>  handleChange(e as searchDateRange)}
          value={value}
        />
      </Col>
      <Col>
        <Button onClick={() => handleChangeShortcut('today')}>
          오늘
        </Button>
      </Col>
      {recentThreeDay && (
        <Col>
          <Button
            onClick={() => handleChangeShortcut('3')}
          >
            최근 3일
          </Button>
        </Col>
      )}

      <Col>
        <Button onClick={() => handleChangeShortcut('week')}>
          최근 7일
        </Button>
      </Col>
      {recentTwoWeek && (
        <Col>
          <Button
            onClick={() => handleChangeShortcut('14')}
          >
            최근 14일
          </Button>
        </Col>
      )}

      <Col>
        <Button onClick={() => handleChangeShortcut('month')}>
          최근 30일
        </Button>
      </Col>
    </Row>
  );
};
