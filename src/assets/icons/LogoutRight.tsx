import * as React from 'react';

export function LogoutRight(props: React.SVGProps<SVGSVGElement>) {
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
        d='M18.189 9a15 15 0 012.654 2.556c.105.13.157.287.157.444m-2.811 3a14.998 14.998 0 002.654-2.556A.704.704 0 0021 12m0 0H8m5-7.472A6 6 0 003 9v6a6 6 0 0010 4.472'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
