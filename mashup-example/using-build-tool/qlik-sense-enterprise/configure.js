import { embed } from '@nebula.js/stardust';
import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.170.2.json';
import table from '@nebula.js/sn-table';

const config = {
  host: 'sense-demo.qlik.com',
  appId: '133dab5d-8f56-4d40-b3e0-a6b401391bde',
};

const enigmaApp = await enigma
  .create({
    schema,
    url: `wss://${config.host}/app/${config.appId}`,
  })
  .open();

const app = await enigmaApp.openDoc(config.appId);

const nuked = await embed(app, {
  context: {
    theme: 'light',
    language: 'en-US',
    constraints: {
      active: false,
      passive: false,
      select: false,
    },
  },
  types: [
    {
      name: 'table',
      load: () => Promise.resolve(table),
    },
  ],
});

export default nuked;
