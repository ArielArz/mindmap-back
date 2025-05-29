import { createClient } from 'redis';

const client = createClient();

async function setupRedis() {
  await client.connect();
  await client.set('foo', 'bar');
  const result = await client.get('foo');
  console.log(result);
}

setupRedis();
