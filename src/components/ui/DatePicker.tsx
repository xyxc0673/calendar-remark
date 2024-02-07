import { DateRange } from 'react-day-picker';
import {
  Button,
  DatePickerCalendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CalendarFilled } from '@/assets/icons';
import { usePreference } from '@/hooks/usePreference';
import clsxm from '@/libs/clsxm';

type DatePickerProps = {
  from?: Date;
  to?: Date;
  min?: number;
  max?: number;
  className?: string;
  onChange?: (range?: DateRange) => void;
};

export function DatePickerWithRange({
  from,
  to,
  min,
  max,
  className,
  onChange,
}: DatePickerProps) {
  const {
    preference: { firstDayOfWeek },
  } = usePreference();
  const [date, setDate] = useState<DateRange | undefined>({
    from: from,
    to: to,
  });

  useEffect(() => {
    setDate({ from: from, to: to });
  }, [from, to]);

  const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');

  const handleDateChange = (range?: DateRange) => {
    setDate(range);
    onChange?.(range);
  };

  return (
    <div className={clsxm('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={clsxm(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarFilled className='mr-2 size-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>选择日期范围</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          <DatePickerCalendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            min={min}
            max={max}
            weekStartsOn={firstDayOfWeek}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
