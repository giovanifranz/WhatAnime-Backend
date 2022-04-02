import { Ingest, Search } from 'sonic-channel'

const configSonic = {
  host: 'sonic',
  port: 1491,
  auth: 'SecretPassword'
}

export const sonicChannelIngest = new Ingest(configSonic)

export const sonicChannelSearch = new Search(configSonic)
