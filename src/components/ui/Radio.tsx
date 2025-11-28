import { useEffect, useState, useRef } from 'react';
import { customAlphabet } from 'nanoid';
import clsxm from '@/libs/clsxm';
const nanoid = customAlphabet('1234567890abcdef', 10);

const RadioButtonGroup = ({
  value,
  options,
  onChange,
}: {
  value: string | number;
  options: { label: string; value: string | number }[];
  onChange?: (value: string | number) => void;
}) => {
  const [selected, setSelected] = useState(value);
  const [backgroundStyle, setBackgroundStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // 计算滑动背景的位置和宽度
  useEffect(() => {
    const selectedIndex = options.findIndex((opt) => opt.value === selected);
    if (selectedIndex >= 0 && optionRefs.current[selectedIndex] && containerRef.current) {
      const selectedElement = optionRefs.current[selectedIndex];
      if (selectedElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();
        
        setBackgroundStyle({
          left: selectedRect.left - containerRect.left,
          width: selectedRect.width,
        });
      }
    }
  }, [selected, options]);

  const handleChange = (value: string | number) => {
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <div className='flex items-center justify-center rounded-full h-8 py-0.5 px-1 w-fit bg-slate-200'>
      <div ref={containerRef} className='relative flex items-center justify-center rounded-full w-fit'>
        <div
          className='absolute h-6 transition-all duration-300 ease-in-out bg-blue-500 rounded-full'
          style={{
            left: `${backgroundStyle.left}px`,
            width: `${backgroundStyle.width}px`,
          }}
        />

        {options.map((option, index) => {
          const id = nanoid();

          return (
            <div
              key={option.value}
              ref={(el) => (optionRefs.current[index] = el)}
              className='relative z-10 text-center text-white'
            >
              <input
                id={id}
                type='radio'
                value={option.value}
                checked={selected === option.value}
                onChange={() => handleChange(option.value)}
                className='sr-only' // Hide the default radio button
              />
              <label
                htmlFor={id}
                className={clsxm(
                  'cursor-pointer px-3 py-1 transition-colors duration-200 whitespace-nowrap',
                  selected === option.value ? 'text-white' : 'text-gray-700'
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
