import dayjs from 'dayjs';
import { InfoCard } from './ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RadioButtonGroup, Divider } from './ui';
import { LogoutRight, PencilBox, RotateRight } from '@/assets/icons';
import { holidayDetails } from '@/configs/holidays';
import { useCustomDay } from '@/hooks/useCustomDay';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import clsxm from '@/libs/clsxm';
import { Input } from './ui';
import { generateDay } from '@/libs/day';
import { useTranslation } from 'react-i18next';
import { BADGE_CONSTANTS, DAY_TYPES } from '@/configs/constant';

const EditArea = ({ date, isEditing }: { date: Date; isEditing: boolean }) => {
  const { customDay, updateCustomDay, updateBadge, updateContent } =
    useCustomDay(date);
  const day = generateDay(date);
  const compositionFlag = useRef(false);
  const { t, i18n } = useTranslation();
  const isChineseLocale = i18n.language.startsWith('zh');

  const [badgeValue, setBadgeValue] = useState<string | undefined>();

  useEffect(() => {
    let badge: string = BADGE_CONSTANTS.EMPTY;

    if (customDay.badge !== undefined) {
      badge = customDay.badge;
    } else if (day.isWorkDay) {
      badge = isChineseLocale ? BADGE_CONSTANTS.WORKDAY_ZH : BADGE_CONSTANTS.WORKDAY_EN;
    } else if (day.isRestDay) {
      badge = isChineseLocale ? BADGE_CONSTANTS.RESTDAY_ZH : BADGE_CONSTANTS.RESTDAY_EN;
    }

    setBadgeValue(badge);
  }, [customDay.badge, day.isWorkDay, day.isRestDay, isChineseLocale]);

  const content = useMemo(() => {
    if (customDay.content !== undefined) {
      return customDay.content;
    }

    if (day.holiday) {
      return isChineseLocale 
        ? holidayDetails[day.holiday].chinese
        : holidayDetails[day.holiday].english;
    }

    if (day.solarTerm) {
      return day.solarTerm;
    }

    if (day.festivals.length > 0) {
      return day.festivals[0];
    }

    return day.lunarDate;
  }, [
    customDay.content,
    day.festivals,
    day.holiday,
    day.lunarDate,
    day.solarTerm,
    isChineseLocale,
  ]);

  const dayType = useMemo(() => {
    if (customDay.theme !== undefined) {
      return customDay.theme;
    }
    if (day.isWorkDay) {
      return DAY_TYPES.WORKDAY;
    }

    if (day.isRestDay) {
      return DAY_TYPES.RESTDAY;
    }

    return DAY_TYPES.EMPTY;
  }, [customDay.theme, day.isWorkDay, day.isRestDay]);

  const options = [
    { value: DAY_TYPES.EMPTY, label: t('dayInfo.none', '无') },
    { value: DAY_TYPES.WORKDAY, label: t('common.workday', '班') },
    { value: DAY_TYPES.RESTDAY, label: t('common.restday', '休') },
  ];

  const handleUpdateTheme = (theme: string | number) => {
    let newBadge: string = BADGE_CONSTANTS.EMPTY;

    switch (theme) {
      case DAY_TYPES.WORKDAY:
        newBadge = isChineseLocale ? BADGE_CONSTANTS.WORKDAY_ZH : BADGE_CONSTANTS.WORKDAY_EN;
        break;
      case DAY_TYPES.RESTDAY:
        newBadge = isChineseLocale ? BADGE_CONSTANTS.RESTDAY_ZH : BADGE_CONSTANTS.RESTDAY_EN;
        break;
      default:
        newBadge = BADGE_CONSTANTS.EMPTY;
    }

    updateCustomDay({
      ...customDay,
      badge: newBadge,
      theme: theme as '' | 'workday' | 'restDay',
    });
  };

  // 限制为一个中文或者数字或者英文
  const validateBadgeValue = (value: string) => {
    if (compositionFlag.current) {
      setBadgeValue(value);
      return;
    }

    // eslint-disable-next-line no-control-regex
    const reg = /^[^\x00-\xff]{0,1}$|^[a-zA-Z\d]{0,1}$/;

    let newValue = '';

    if (reg.test(value)) {
      newValue = value;
    } else {
      // 截取第一个字符，用于一次性输入多个字符的情况
      newValue = value.slice(0, 1);
    }
    setBadgeValue(newValue);
    updateBadge(newValue);
  };

  const handleUpdateContent: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    updateContent(e.target.value);
  };

  const handleUpdateBadge: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    validateBadgeValue(e.target.value);
  };

  const handleCompositionStart = () => {
    compositionFlag.current = true;
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    compositionFlag.current = false;
    validateBadgeValue(e.currentTarget.value);
  };

  return (
    <div
      className={clsxm(
        'flex flex-col transition-all duration-200 text-sm',
        isEditing
          ? 'opacity-100 translate-y-0 h-14 visible'
          : 'opacity-0 -translate-y-full h-0 invisible'
      )}
    >
      <Divider direction='horizontal' className='my-3' />
      <div className='flex items-center h-full gap-3'>
        <span className='hidden text-nowrap md:inline-block'>{t('dayInfo.content')}</span>
        <Input
          type='text'
          placeholder={t('dayInfo.contentPlaceholder')}
          value={content}
          maxLength={6}
          allowClear
          onChange={handleUpdateContent}
        />
        <span className='hidden text-nowrap md:inline-block'>{t('dayInfo.badge')}</span>
        <Input
          name='badge'
          type='text'
          placeholder={t('dayInfo.badgePlaceholder')}
          value={badgeValue}
          allowClear
          onChange={handleUpdateBadge}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <RadioButtonGroup
          value={dayType}
          options={options}
          onChange={handleUpdateTheme}
        />
      </div>
    </div>
  );
};

const DayInfoCard = () => {
  const { selectedDate } = useSelectedDate();
  const { t, i18n } = useTranslation();
  const isChineseLocale = i18n.language.startsWith('zh');
  
  // 根据语言环境格式化日期
  const formattedDate = isChineseLocale 
    ? dayjs(selectedDate).format('YYYY年MM月DD日')
    : dayjs(selectedDate).format('MMMM DD, YYYY');
  
  const weekDay = dayjs(selectedDate).format('dddd');
  const weekNumber = dayjs(selectedDate).week();
  const [isEditing, setIsEditing] = useState(false);
  const Icon = isEditing ? LogoutRight : PencilBox;
  const { resetCustomDay } = useCustomDay(selectedDate);

  return (
    <InfoCard className='flex flex-col dark:text-zinc-200'>
      <div className='relative flex items-center justify-end'>
        <span className='absolute text-sm -translate-x-1/2 left-1/2 text-nowrap md:text-base'>
          {`${formattedDate} ${weekDay} ${t('yearProgress.weekOfYear', { week: weekNumber })}`}
        </span>
        <div className='flex gap-2'>
          <button
            className={clsxm(
              'z-10 flex items-center justify-center transition-all duration-200 border border-transparent rounded-lg cursor-pointer md:size-6 hover:bg-white hover:border-slate-600',
              !isEditing
                ? 'opacity-0 translate-x-full invisible'
                : 'opacity-100 translate-x-0 visible'
            )}
            onClick={() => resetCustomDay()}
          >
            <RotateRight className='size-4 dark:stroke-zinc-200' />
          </button>
          <button
            className='z-10 flex items-center justify-center transition-colors duration-200 border border-transparent rounded-lg cursor-pointer md:size-6 hover:bg-white hover:border-slate-600'
            onClick={() => setIsEditing(!isEditing)}
          >
            <Icon className='size-4 dark:stroke-zinc-200' />
          </button>
        </div>
      </div>
      <EditArea date={selectedDate} isEditing={isEditing} />
    </InfoCard>
  );
};

export default DayInfoCard;
