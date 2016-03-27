import request from 'superagent';
import config from 'config';

const {protocol, domain, port} = config.get( 'Client.server' );
const baseUrl = `${protocol}://${domain}:${port}`;

export const server = route => request
  .post( baseUrl + route )
  .set( 'Accept', 'application/json' )
  .set( 'Content-Type', 'application/json' );
