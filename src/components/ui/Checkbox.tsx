import { useNanoId } from '@/hooks/useNanoId';

const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  const id = useNanoId({ prefix: 'checkbox' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className='relative inline-block align-middle transition duration-200 ease-in select-none'>
      <input
        type='checkbox'
        className='opacity-0 sr-only peer'
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className='relative flex h-5 w-10 md:h-6 md:w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-4 before:w-4  md:before:h-5 md:before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-blue-500'
      >
        <span className='sr-only'>Enable</span>
      </label>
    </div>
  );
};

export default Checkbox;
