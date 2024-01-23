import dayjs from 'dayjs';
import { InfoCard } from './ui';
import { useMemo, useRef, useState } from 'react';
import { RadioButtonGroup, Divider } from './ui';
import { LogoutRight, PencilBox, RotateRight } from '@/assets/icons';
import { holidayDetails } from '@/configs/holidays';
import { useCustomDay } from '@/hooks/useCustomDay';
import useDay from '@/hooks/useDay';
import { useSelectedDate } from '@/hooks/useSelectedDate';
import clsxm from '@/libs/clsxm';
import { Input } from './ui';

const EditArea = ({ date, isEditing }: { date: Date; isEditing: boolean }) => {
  const { customDay, updateCustomDay, updateBadge, updateContent } =
    useCustomDay(date);
  const day = useDay(date);
  const compositionFlag = useRef(false);

  const badge = useMemo(() => {
    if (customDay.badge !== undefined) {
      return customDay.badge;
    }

    if (day.isWorkDay) {
      return '班';
    }

    if (day.isRestDay) {
      return '休';
    }
    return '';
  }, [customDay.badge, day.isWorkDay, day.isRestDay]);

  const [badgeValue, setBadgeValue] = useState(badge);

  const content = useMemo(() => {
    if (customDay.content !== undefined) {
      return customDay.content;
    }

    if (day.holiday) {
      return holidayDetails[day.holiday].chinese;
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
  ]);

  const dayType = useMemo(() => {
    if (customDay.theme) {
      return customDay.theme;
    }
    if (day.isWorkDay) {
      return 'workday';
    }

    if (day.isRestDay) {
      return 'restDay';
    }

    return '';
  }, [customDay.theme, day.isWorkDay, day.isRestDay]);

  const options = [
    { value: '', label: '无' },
    { value: 'workday', label: '班' },
    { value: 'restDay', label: '休' },
  ];

  const handleUpdateTheme = (theme: string | number) => {
    let newBadge: string = '';

    switch (theme) {
      case 'workday':
        newBadge = '班';
        break;
      case 'restDay':
        newBadge = '休';
        break;
      default:
        newBadge = '';
    }

    updateCustomDay({
      ...customDay,
      badge: newBadge,
      theme: theme as '' | 'workday' | 'restDay',
    });
  };

  // 限制为一个中文或者数字或者英文
  const handleBadgeUpdate = (value: string) => {
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
    updateBadge(e.target.value);
  };

  const handleCompositionStart = () => {
    compositionFlag.current = true;
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    compositionFlag.current = false;
    handleBadgeUpdate(e.currentTarget.value);
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
        <span className='hidden text-nowrap md:inline-block'>日期底部内容</span>
        <Input
          type='text'
          placeholder='例如：春节'
          value={content}
          maxLength={6}
          allowClear
          onChange={handleUpdateContent}
        />
        <span className='hidden text-nowrap md:inline-block'>标记</span>
        <Input
          name='badge'
          type='text'
          placeholder='例如：休'
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
  const formattedDate = dayjs(selectedDate).format('YYYY年MM月DD日');
  const weekDay = dayjs(selectedDate).format('dddd');
  const weekNumber = dayjs(selectedDate).week();
  const [isEditing, setIsEditing] = useState(false);
  const Icon = isEditing ? LogoutRight : PencilBox;
  const { customDay, resetCustomDay } = useCustomDay(selectedDate);

  return (
    <InfoCard className='flex flex-col dark:text-zinc-200'>
      <div className='relative flex items-center justify-end'>
        <span className='absolute text-sm -translate-x-1/2 left-1/2 text-nowrap md:text-base'>{`${formattedDate} ${weekDay} 第${weekNumber}周`}</span>
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
      <EditArea
        key={selectedDate.toDateString() + customDay.badge}
        date={selectedDate}
        isEditing={isEditing}
      />
    </InfoCard>
  );
};

export default DayInfoCard;
