import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...props}
    fill="currentColor"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--accent))" />
      </linearGradient>
    </defs>
    <path
      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
      opacity="0.2"
    />
    <path
      d="m169.57 86.43-83.14 46.2a4 4 0 0 0-2 3.46v.05l-1.33 46.16a4 4 0 0 0 6.13 3.4l83.14-46.2a4 4 0 0 0 2-3.46v-.05l1.33-46.16a4 4 0 0 0-6.13-3.4Z"
      fill="url(#logo-gradient)"
      strokeWidth="0"
    />
    <path
      d="m169.57 86.43-83.14 46.2a4 4 0 0 0-2 3.46v.05l-1.33 46.16a4 4 0 0 0 6.13 3.4l83.14-46.2a4 4 0 0 0 2-3.46v-.05l1.33-46.16a4 4 0 0 0-6.13-3.4Z"
      opacity="0.4"
      strokeWidth="0"
    />
  </svg>
);

export default Logo;
