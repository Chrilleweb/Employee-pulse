import clsx from 'clsx';
import Link from 'next/link';

interface LogoProps {
  classNames?: string;
}

function Logo({ classNames = '' }: LogoProps) {
  return (
    <Link href={'/'} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={clsx(
          'block ml-14 font-serif text-2xl text-zinc-600 translate-y-[-2px] md:ml-11',
          classNames
        )}
      >
        Employee Pulse
      </a>
    </Link>
  );
}

export default Logo;
