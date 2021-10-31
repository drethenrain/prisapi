/* eslint-disable no-console */
import { networkInterfaces } from 'os';
import express from 'express';

import { route } from './routes';
const app = express();

const network = networkInterfaces();
const ip = network.wlp1s0
  ? network.wlp1s0[0].address
  : network[Object.keys(network)[1]]?.[0]?.address;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route);

app.listen(3333, () => {
  console.log('[SERVER] Server is running');
  console.log(`[SERVER] http://${ip}:3333`);
  console.log('[SERVER] http://localhost:3333');
});
