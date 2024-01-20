import clsxm from '@/libs/clsxm';

const DateComponent = ({
  date,
  showBadge,
  badgeText,
  badgeClassName,
  content,
  className,
  dateClassName,
  onClick,
}: {
  date: Date;
  showBadge?: boolean;
  badgeText?: string;
  badgeClassName?: string;
  content: string;
  className?: string;
  dateClassName?: string;
  onClick?: () => void;
}) => {
  const dateOfMonth = date.getDate();

  const canShowBadge = showBadge && badgeText !== '';

  return (
    <div
      className={clsxm(
        'group gap-0.5 relative flex flex-col justify-center p-1 md:p-2 text-center text-gray-700 dark:text-gray-200 w-full aspect-square rounded-xl cursor-pointer transition-all',
        className
      )}
      onClick={onClick}
    >
      <span className='text-2xl leading-6 max-md:scale-75'>{dateOfMonth}</span>
      <span
        className={clsxm(
          'max-md:scale-75 text-xs text-zinc-800 dark:text-zinc-200',
          dateClassName
        )}
      >
        {content}
      </span>
      {canShowBadge && (
        <span
          className={clsxm(
            'absolute max-md:scale-75 w-5 h-5 !leading-5 top-0 right-0 text-xs text-white md:translate-x-1/2 md:-translate-y-1/2 translate-x-1/3 -translate-y-1/3 bg-red-500',
            badgeClassName
          )}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default DateComponent;
