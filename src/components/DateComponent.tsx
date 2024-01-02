import clsxm from '../libs/clsxm';

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
        'relative flex flex-col justify-center p-2 text-center text-gray-700 w-20 h-20 rounded-md cursor-pointer transition-all duration-100',
        className
      )}
      onClick={onClick}
    >
      <span className='text-2xl'>{dateOfMonth}</span>
      <span className={clsxm('text-xs text-gray-400', dateClassName)}>
        {content}
      </span>
      {canShowBadge && (
        <span
          className={clsxm(
            'absolute w-5 h-5 !leading-5 top-0 right-0 text-xs text-white translate-x-1/2 -translate-y-1/2 bg-red-500',
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
