import { SnowflakeId } from "@akashrajpurohit/snowflake-id";

const snowflake = SnowflakeId({
  workerId: process.pid % 1024,
});

export const generateSnowflakeId = () => {
  return snowflake.generate();
};
