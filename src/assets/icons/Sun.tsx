import * as React from 'react';

export function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke='#475569'
      {...props}
    >
      <g clipPath='url(#prefix__clip0_245_229)'>
        <path
          d='M12 23v-1m-7.778-2.222l.707-.707M1 12h1m2.222-7.778l.707.707M12 2V1m7.071 3.929l.707-.707M22 12h1m-3.929 7.071l.707.707M18 12a6 6 0 11-12 0 6 6 0 0112 0z'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='prefix__clip0_245_229'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
