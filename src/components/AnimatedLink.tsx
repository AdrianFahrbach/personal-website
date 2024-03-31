import Link from 'next/link';
import React from 'react';
import './AnimatedLink.scss';

interface AnimatedLinkProps {
  to: string;
  label: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, label }) => {
  return (
    <Link href={to} className='animated-link'>
      {label}
    </Link>
  );
};

export default AnimatedLink;
