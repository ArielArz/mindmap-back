import { createClient } from 'redis';

async function main() {
  const client = createClient({
    username: 'default',
    password: 'S4KMEM1Du6KoFKFFg4IkSgsYNsT58SF8',
    socket: {
      host: 'redis-15979.c336.samerica-east1-1.gce.redns.redis-cloud.com',
      port: 15979,
    },
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('foo', 'bar');
  const result = await client.get('foo');
  console.log(result); // >>> bar
}

main();
