import { } from 'znapi';

export const load = async ({ parent }) => {
  const data = await parent();
  return {
    ...data
  };
};
