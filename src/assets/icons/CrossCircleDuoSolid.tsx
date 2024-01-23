import * as React from 'react';

export function CrossCircleDuoSolid(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        opacity={0.28}
        d='M12 1.85C6.394 1.85 1.85 6.394 1.85 12c0 5.605 4.544 10.15 10.15 10.15 5.605 0 10.15-4.544 10.15-10.15 0-5.606-4.545-10.15-10.15-10.15z'
        fill='#111'
      />
      <path
        d='M8.9 15.1L12 12m0 0l3.1-3.1M12 12L8.9 8.9M12 12l3.1 3.1'
        stroke='#fff'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
