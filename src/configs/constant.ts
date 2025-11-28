export const days = new Map([
  [0, '日'],
  [1, '一'],
  [2, '二'],
  [3, '三'],
  [4, '四'],
  [5, '五'],
  [6, '六'],
]);

// Badge 标记常量
export const BADGE_CONSTANTS = {
  // 中文标记
  WORKDAY_ZH: '班',
  RESTDAY_ZH: '休',
  // 英文标记
  WORKDAY_EN: 'W',
  RESTDAY_EN: 'R',
  // 空标记
  EMPTY: '',
} as const;

// 日期类型常量
export const DAY_TYPES = {
  WORKDAY: 'workday',
  RESTDAY: 'restDay',
  EMPTY: '',
} as const;
