import { embed } from '@nebula.js/stardust';
import enigma from 'enigma.js';
import schema from 'enigma.js/schemas/12.170.2.json';
import table from '@nebula.js/sn-table';

const config = {
  host: 'rd-gqq-08-21.rdlund.qliktech.com',
  appId: '46cac4f4-5cd0-4d39-ba95-73b9366b430e',
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
