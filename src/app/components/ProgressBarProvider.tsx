'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = () => {
  const pathname = usePathname();
console.log(pathname)
  useEffect(() => {}, [pathname]);

  return (
    <ProgressBar
      height="4px"
      color="#4CAF50"
      options={{ showSpinner: false }}
      shallowRouting
    disableStyle={false}
    />
  );
};

export default ProgressBarProvider;
