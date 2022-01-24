const Redis = require("ioredis");

const redis =
  process.env.NODE_ENV === "development"
    ? new Redis()
    : new Redis({
        port: 6379,
        host: "redis",
      });

export { redis };
