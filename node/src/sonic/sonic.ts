import { Ingest, Search } from 'sonic-channel';

export const sonicChannelIngest = new Ingest({
  host: 'sonic',
  port: 1491,
  auth: 'SecretPassword',
});

export const sonicChannelSearch = new Search({
  host: 'sonic',
  port: 1491,
  auth: 'SecretPassword',
});
