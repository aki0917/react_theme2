import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGender, setYear, setMonth, setDay } from './surveySlice';
import { RootState } from './store';
import { useNavigate } from 'react-router-dom';


const BasicInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gender, year, month, day } = useSelector((state: RootState) => state.survey);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const toGengo = (year: number): string => {
    if (year >= 1989 && year <= 2019) {
      const heiseiYear = year - 1988;
      return `平成${heiseiYear}年`;
    } else if (year >= 1926 && year <= 1988) {
      const showaYear = year - 1925;
      return `昭和${showaYear}年`;
    }
    return '';
  };

  const handleNext = () => {
    navigate('/survey');
  };

  return (
    <div>
      <h2>基本情報入力</h2>

      <div>
        <label>-性別-</label>
          <div>
          <input 
            type="radio"
            id='male'
            name='gender'
            value='male' 
            checked={gender === 'male'}
            onChange={e => dispatch(setGender(e.target.value))}
          />
          <label htmlFor="male">男性</label>

            <input 
              type="radio"
              id='female'
              name='gender'
              value='female'
              checked={ gender === 'female'}
              onChange={e => dispatch(setGender(e.target.value))}
            />
            <label htmlFor="female">女性</label>
          </div>
      </div>

      <div>
        <label>生年月日:</label>
        <select value={year} onChange={e => dispatch(setYear(e.target.value))}>
          <option value="">年</option>
          {years.filter(y => (y <= 2019 && y >= 1926)).map(y => (
          <option key={y} value={y}>
           {y}年 {toGengo(y) && `(${toGengo(y)})`}
          </option>
          ))}
        </select>
        <select value={month} onChange={e => dispatch(setMonth(e.target.value))}>
          <option value="">月</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}月</option>)}
        </select>
        <select value={day} onChange={e => dispatch(setDay(e.target.value))}>
          <option value="">日</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}日</option>)}
        </select>
      </div>

      <button onClick={handleNext}>次に進む</button>
    </div>
  );
}

export default BasicInfo;
