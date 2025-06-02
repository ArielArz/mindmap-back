import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

async function setupRedis() {
  try {
    await client.connect();
    await client.set('foo', 'bar');
    const result = await client.get('foo');
    console.log(result);
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
}

setupRedis();
