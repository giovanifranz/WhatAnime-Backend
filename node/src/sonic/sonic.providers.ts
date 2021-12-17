import { sonicChannelIngest, sonicChannelSearch } from './sonic';

export const sonicProviders = [
  {
    provide: 'SONIC_CONNECTION',
    useFactory: async () => {
      sonicChannelIngest.connect({
        connected: () => {
          console.log('Ingest Conectou');
        },
      });

      sonicChannelSearch.connect({
        connected: () => {
          console.log('Search Conectou');
        },
      });
    },
  },
];
