import clsxm from '@/libs/clsxm';

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
        direction === 'horizontal' ? 'border-b w-full' : 'border-r h-full',
        'border-gray-200 dark:border-zinc-600',
        className
      )}
    />
  );
};

export default Divider;
