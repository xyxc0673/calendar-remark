import * as React from 'react';

export function PencilBox(props: React.SVGProps<SVGSVGElement>) {
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
        d='M20 14c0 2.8 0 4.2-.545 5.27a5 5 0 01-2.185 2.185C16.2 22 14.8 22 12 22h-2c-2.8 0-4.2 0-5.27-.545a5 5 0 01-2.185-2.185C2 18.2 2 16.8 2 14v-2c0-2.8 0-4.2.545-5.27A5 5 0 014.73 4.545C5.8 4 7.2 4 10 4m-1.938 9.502c.008-.351.013-.527.055-.691.038-.146.097-.286.177-.414.09-.144.213-.268.46-.517l9.396-9.45a1.46 1.46 0 011.828-.196A5.87 5.87 0 0121.7 3.946l.075.116c.376.605.253 1.371-.24 1.867l-9.322 9.375c-.257.257-.385.386-.534.478a1.476 1.476 0 01-.429.178c-.17.04-.351.04-.714.04L8 15.996l.062-2.495z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
