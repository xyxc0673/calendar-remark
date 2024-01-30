import * as React from 'react';

export function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='#475569'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        d='M14.125 8.14a20.357 20.357 0 00-3.894 3.701.472.472 0 000 .596 20.359 20.359 0 003.894 3.702'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
