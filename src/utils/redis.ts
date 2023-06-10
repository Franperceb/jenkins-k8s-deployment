import { createClient } from 'redis';

const redisUrl = `redis://192.168.226.70:6379`; //volver dinámica la url y puerto
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};
export const disconnectRedis = async () => {
  try {
    await redisClient.disconnect();
    console.log('Redis client disconnected...');
  } catch (err: any) {
    console.log(err.message);
    setTimeout(disconnectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;
