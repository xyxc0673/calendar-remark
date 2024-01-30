import * as React from 'react';

export function CalendarFilled(props: React.SVGProps<SVGSVGElement>) {
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
        d='M8 2v2.128M8 6V4.128M16 2v2.128M16 6V4.128M20.96 10c.04.788.04 1.755.04 3 0 2.796 0 4.194-.457 5.296a6 6 0 01-3.247 3.247C16.194 22 14.796 22 12 22c-2.796 0-4.193 0-5.296-.457a6 6 0 01-3.247-3.247C3 17.194 3 15.796 3 13c0-1.245 0-2.212.04-3m17.92 0c-.05-.982-.163-1.684-.417-2.296a6 6 0 00-3.247-3.247A5.136 5.136 0 0016 4.127M20.96 10H3.04m0 0c.05-.982.163-1.684.417-2.296a6 6 0 013.247-3.247A5.135 5.135 0 018 4.127m0 0C8.941 4 10.172 4 12 4c1.828 0 3.059 0 4 .128M8.01 14H8m.01 4H8m4.01-4H12m.01 4H12m4.01-4H16m.01 4H16'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
