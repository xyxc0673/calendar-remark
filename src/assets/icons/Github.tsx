import * as React from 'react';

export function Github(props: React.SVGProps<SVGSVGElement>) {
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
        d='M10 15a3.72 3.72 0 00-1 2.58V21m5-6a3.72 3.72 0 011 2.58V21m-6-1.95a5.7 5.7 0 01-2.82.36c-1.52-.52-1.12-1.9-1.9-2.47A2.37 2.37 0 003 16.5m16-6.75c0 3-1.95 5.25-7 5.25s-7-2.25-7-5.25a6.3 6.3 0 01.68-3c-.34-1.47-.21-3.28.52-3.64.73-.36 2.27.3 3.54 1.15a12.86 12.86 0 012.26-.2 12.86 12.86 0 012.26.18c1.27-.85 2.88-1.48 3.54-1.15.66.33.86 2.17.52 3.64A6.3 6.3 0 0119 9.75z'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
