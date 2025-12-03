import NextLink from 'next/link';
import styles from './Link.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} className={styles.link}>
      {children}
    </NextLink>
  );
}
