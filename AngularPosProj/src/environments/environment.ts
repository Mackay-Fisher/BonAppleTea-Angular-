// import { domain, clientId } from '../../auth_config.json';
import { default as auth } from '../../auth_config.json';
/**
 * This decides between using the local host or the current url as teh wya to get the database commands
 */
export const environment = {
  production: true,
  auth: {
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin,
  },
  apiUrl: 'https://bonappetea.onrender.com/api',
};