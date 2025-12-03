import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={variant === 'primary' ? styles.primary : styles.secondary}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
