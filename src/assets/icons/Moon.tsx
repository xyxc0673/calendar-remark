import * as React from 'react';

export function Moon(props: React.SVGProps<SVGSVGElement>) {
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
        d='M21 13.907A7.948 7.948 0 0110.093 3 9.112 9.112 0 1021 13.907z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
