import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Badger Logo"
    >
      <path
        d="M50 2.5 L95.5 26.25 V 73.75 L50 97.5 L4.5 73.75 V 26.25 Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M30 25 h 25 a 15 15 0 0 1 0 25 H 30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 50 h 30 a 20 20 0 0 1 0 25 H 30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
