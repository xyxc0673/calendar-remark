import clsxm from '../libs/clsxm';

const Divider = ({
  direction = 'horizontal',
  className,
}: {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}) => {
  return (
    <div
      className={clsxm(
        'w-full h-full',
        direction === 'horizontal' ? 'border-b' : 'border-r',
        'border-gray-200 dark:border-zinc-600',
        className
      )}
    />
  );
};

export default Divider;
