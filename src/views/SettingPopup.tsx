import { useState } from 'react';
import { CrossCircle, Settings } from '../assets/icons';
import { usePreference } from '../hooks/usePreference';
import clsxm from '../libs/clsxm';

const SettingPage = ({
  isOpen,
  onCancel,
}: {
  isOpen: boolean;
  onCancel: () => void;
}) => {
  const { preference, toggleShowExtraDays } = usePreference();

  return (
    <div
      className={clsxm(
        'flex flex-col absolute left-0 top-0 overflow-hidden w-60 h-fit bg-white transition-all duration-300 shadow-lg rounded-lg',
        isOpen
          ? 'opacity-100 scale-100 -translate-x-full -translate-y-full'
          : 'opacity-0 scale-50'
      )}
    >
      <div className='relative flex items-center justify-end px-2 py-2 text-center bg-slate-100'>
        <span className='absolute py-2 text-xs text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:text-sm'>
          设置
        </span>
        <CrossCircle
          className='text-gray-500 transition-all duration-200 cursor-pointer size-4 md:size-6 hover:text-gray-700 hover:rotate-90'
          onClick={onCancel}
        />
      </div>
      <div className='flex-1 gap-2 p-4 text-sm'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-700'>显示非本月日期</span>
          <div className='relative inline-block w-10 align-middle transition duration-200 ease-in select-none'>
            <input
              type='checkbox'
              className='opacity-0 sr-only peer'
              id='toggle'
              checked={preference.showExtraDays}
              onChange={toggleShowExtraDays}
            />
            <label
              htmlFor='toggle'
              className='relative flex h-5 w-10 md:h-6 md:w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-4 before:w-4  md:before:h-5 md:before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-blue-500'
            >
              <span className='sr-only'>Enable</span>
            </label>
          </div>
        </div>
        <div></div>
      </div>
      <span className='py-2 text-xs text-center bg-slate-100 md:text-sm'>
        v0.0.1
      </span>
    </div>
  );
};

export const SettingPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='relative flex justify-end'>
      <div className='relative'>
        <div
          className='flex items-center justify-center transition-all duration-200 border border-transparent rounded-lg cursor-pointer size-6 md:size-8 group hover:bg-white hover:border-slate-600'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings className='size-4 md:size-6' />
        </div>
        <SettingPage isOpen={isOpen} onCancel={() => setIsOpen(false)} />
      </div>
    </div>
  );
};
