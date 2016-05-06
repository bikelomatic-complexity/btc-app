import { fromPairs } from 'lodash';
import config from 'config';

import superagent from 'superagent';

const {protocol, domain, port} = config.get( 'Client.server' );
const baseUrl = `${protocol}://${domain}:${port}`;

export const request = fromPairs(
  [ 'post', 'get', 'put', 'delete' ].map(
    method => [ method, route => superagent[ method ].call( null, baseUrl + route ) ]
  )
);
