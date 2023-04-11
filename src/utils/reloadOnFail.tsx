import { ComponentType } from 'react';
import PageLoader from '../components/loaders/PageLoader';

export default function reloadOnFail(
  fn: {(): Promise<{ default: ComponentType<any>; }>; }
): Promise<{ default: React.ComponentType<any> }> {
  return new Promise(resolve => {
    fn()
      .then(resolve)
      .catch(() => {
        window.location.reload();
        return resolve({ default: PageLoader });
      });
  });
}