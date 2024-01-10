import { SVGProps } from 'react';

export const CrossCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#475569'
      {...props}
    >
      <path
        d='M9.00006 15L12.0001 12M12.0001 12L15.0001 9M12.0001 12L9.00006 9M12.0001 12L15.0001 15M12 20.9999C7.02944 20.9999 3 16.9704 3 11.9999C3 7.02932 7.02944 2.99988 12 2.99988C16.9706 2.99988 21 7.02932 21 11.9999C21 16.9704 16.9706 20.9999 12 20.9999Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
