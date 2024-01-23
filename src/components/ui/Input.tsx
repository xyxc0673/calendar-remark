import type { InputProps as RcInputProps } from 'rc-input';
import RcInput from 'rc-input';
import { CrossCircleDuoSolid } from '@/assets/icons';
import { useState } from 'react';
import clsxm from '@/libs/clsxm';

const Input = ({ allowClear, value, ...props }: RcInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const mergedAllowClear =
    allowClear && value !== undefined && value !== null && value !== '';

  const iconClassName = 'size-3 md:size-4';

  return (
    <div
      className={clsxm(
        'overflow-hidden bg-white rounded-md px-1.5 py-0.5 transition-all duration-200 border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200',
        isFocused && 'outline-none ring-2 ring-slate-500 border-transparent'
      )}
    >
      <RcInput
        classNames={{
          affixWrapper: 'flex text-sm items-center',
          suffix: iconClassName,
          input:
            'w-full outline-none bg-transparent text-xs md:text-sm placeholder:text-xs placeholder:md:text-sm',
        }}
        value={value}
        allowClear={{
          clearIcon: mergedAllowClear ? (
            <CrossCircleDuoSolid
              className={`cursor-pointer ${iconClassName}`}
            />
          ) : (
            <div className={iconClassName} />
          ),
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
};

export default Input;
