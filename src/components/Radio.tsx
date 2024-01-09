import { useState } from 'react';
import clsxm from '../libs/clsxm';

export const RadioButtonGroup = ({
  value,
  options,
  onChange,
}: {
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange?: (value: string | number) => void;
}) => {
  const [selected, setSelected] = useState(value);

  const selectedIndex = options.findIndex((opt) => opt.value === selected);
  const translateAmount = selectedIndex * 100;

  const handleChange = (value: string | number) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <div className='flex items-center justify-center rounded-full h-8 py-0.5 px-1 w-fit bg-slate-200'>
      <div className='relative flex items-center justify-center rounded-full w-fit'>
        <div
          className='absolute left-0 h-6 transition-transform duration-300 ease-in-out bg-blue-500 rounded-full'
          style={{
            transform: `translateX(${translateAmount}%)`,
            width: (1 / options.length) * 100 + '%',
          }}
        />

        {options.map((option, index) => (
          <div
            key={option.value}
            className='relative z-10 px-1 text-center text-white'
          >
            <input
              id={`option-${index}`}
              type='radio'
              name='radio'
              value={option.value}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
              className='sr-only' // Hide the default radio button
            />
            <label
              htmlFor={`option-${index}`}
              className={clsxm(
                'cursor-pointer p-2 transition-colors duration-200',
                selected === option.value ? 'text-white' : 'text-gray-700'
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
