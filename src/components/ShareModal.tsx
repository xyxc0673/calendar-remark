import { atom, useAtom } from 'jotai';
import clsxm from '../libs/clsxm';
import Calendar from './Calendar';
import { useToPng } from '@hugocxl/react-to-image';
import { downloadFromBase64 } from '../libs/download';

export const shareModalOpenAtom = atom<boolean>(false);

const ShareModal = () => {
  const [isOpen, setIsOpen] = useAtom(shareModalOpenAtom);
  const [state, covertToPng, ref] = useToPng<HTMLDivElement>({
    onSuccess: (data) => {
      downloadFromBase64(data, '节假日 - Calendar Remark.png');
    },
  });

  const handleSave = () => {
    if (state.status !== 'loading') {
      covertToPng();
    }
  };

  return (
    <div
      className={clsxm(
        'fixed inset-0 z-10 flex justify-center items-center transition-all duration-300 invisible',
        isOpen ? 'visible bg-black/40' : 'invisible'
      )}
    >
      <div className='absolute w-screen px-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-fit'>
        <div
          className={clsxm(
            'bg-white rounded-lg shadow-md transition-all duration-300 dark:bg-zinc-600',
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
          )}
        >
          <div className='p-1 md:p-4'>
            <div>
              <div ref={ref} className='p-2 bg-white dark:bg-zinc-600'>
                <div className='bg-white dark:bg-zinc-800 w-full md:w-[37.5rem] rounded-lg overflow-hidden  md:shadow-lg shadow-slate-200 text-sm md:text-base'>
                  <div className='w-full px-1 py-2 text-center md:px-2 md:py-4 bg-slate-100 dark:bg-zinc-900/20 dark:text-zinc-200'>
                    Calendar Remark
                  </div>
                  <Calendar isSharing />
                  <div className='flex items-center justify-center w-full gap-1 px-1 py-2 text-sm md:gap-2 md:px-2 md:py-4 bg-slate-100 dark:bg-zinc-900/20 md:text-base dark:text-zinc-200'>
                    <img src='/favicon.svg' className='w-4 h-4 md:w-6 md:h-6' />
                    <span>calendar.xym.im</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-gray-200'></div>
          <div className='flex justify-end gap-4 px-6 py-4'>
            <button
              className='px-3 py-1 text-sm text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-600 md:text-base'
              onClick={() => setIsOpen(false)}
            >
              关闭
            </button>
            <button
              className='px-3 py-1 text-sm text-white transition-all duration-200 bg-blue-500 rounded-md hover:bg-blue-600 md:text-base'
              onClick={() => handleSave()}
            >
              保存图片
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
