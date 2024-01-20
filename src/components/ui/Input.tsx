import clsxm from '../../libs/clsxm';

type InputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsxm(
        'w-full px-1.5 py-0.5 text-sm transition-all duration-200 border border-gray-300 rounded-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent',
        className
      )}
      {...props}
    />
  );
};

export default Input;
