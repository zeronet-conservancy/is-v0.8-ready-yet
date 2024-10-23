import { connect } from 'znapi';

export const ssr = false;
export const prerender = true;

export const load = async () => {
  const useWS = import.meta.env.MODE === 'development';
  const znAPI = connect({ useWS });
  const serverInfo = znAPI.getServerInfo();
  const baseAddr = 'http://127.0.0.1:43110';
  return {
    znAPI,
    serverInfo,
    baseAddr,
  };
};
