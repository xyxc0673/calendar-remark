import * as React from 'react';

export function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
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
        d='M10 8.14a20.351 20.351 0 013.894 3.701.472.472 0 010 .596A20.353 20.353 0 0110 16.139'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
