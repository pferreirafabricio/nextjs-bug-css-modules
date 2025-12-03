import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Dynamic component mapping
const componentMap: Record<string, () => Promise<any>> = {
  card: () => import('@/components/Card'),
  button: () => import('@/components/Button'),
  link: () => import('@/components/Link'),
  list: () => import('@/components/List'),
};

interface DynamicComponentProps {
  type: string;
  [key: string]: any;
}

export default function DynamicComponent({ type, ...props }: DynamicComponentProps) {
  if (!componentMap[type]) {
    return <div>Unknown component type: {type}</div>;
  }

  const Component = dynamic(componentMap[type], {
    loading: () => <div>Loading {type}...</div>,
  }) as ComponentType<any>;

  return <Component {...props} />;
}
