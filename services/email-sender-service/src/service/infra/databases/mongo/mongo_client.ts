import mongoose from 'mongoose';

export class MongoClient {
  private buildRedisUrl(
    host: string,
    port: number,
    database: string,
    username?: string,
    password?: string,
  ): string {
    let url = `mongodb://`;
    if (username && password) {
      url += `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
    }
    url += `${host}:${port}/${database}`;
    return url;
  }

  async connect(): Promise<void> {
    const url: any = this.buildRedisUrl(
      process.env.MONGO_HOST_CONNECTION || '127.0.0.1',
      Number(process.env.MONGO_PORT),
      process.env.MONGO_DB || 'email',
      process.env.MONGO_USERNAME,
      process.env.MONGO_PASSWORD,
    );

    console.log(
      process.env.MONGO_HOST_CONNECTION || '127.0.0.1',
      Number(process.env.MONGO_PORT),
      process.env.MONGO_DB || 'email',
      process.env.MONGO_USERNAME,
      process.env.MONGO_PASSWORD,
    );

    await mongoose.connect(url);
  }
}
