import * as React from 'react';

export function RotateRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke='#475569'
      {...props}
    >
      <path
        d='M17.783 2.67c.51 1.192.862 2.445 1.049 3.726.049.335-.215.485-.479.586l-.094.035m0 0A8 8 0 1019.748 14m-1.489-6.983a15 15 0 01-3.476.85'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
