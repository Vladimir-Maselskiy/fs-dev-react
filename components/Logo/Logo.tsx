import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="logo" width={160} height={28} />
    </Link>
  );
};
