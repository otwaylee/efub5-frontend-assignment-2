import {
  MongoClient,
  type MongoClientOptions,
  type Db,
  type Collection,
} from 'mongodb';
import type Post from '@/models/post';

const url: string = process.env.NEXT_PUBLIC_DB_CONN_STRING || '';
const DB_NAME: string = process.env.NEXT_PUBLIC_DB_NAME || '';
const COLLECTION_POST_NAME: string =
  process.env.NEXT_PUBLIC_COLLECTION_POST_NAME || '';
const options: MongoClientOptions = {};

let client: MongoClient;
let connectDB: Promise<MongoClient>;

if (!url || !DB_NAME || !COLLECTION_POST_NAME)
  throw new Error('.env 설정을 확인해 주세요.');

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 MongoClient를 전역에 저장
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(url, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  connectDB = (global as any)._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 새로운 클라이언트를 생성
  client = new MongoClient(url, options);
  connectDB = client.connect();
}

const db: Db = (await connectDB).db(DB_NAME);
const postCollection: Collection<Post> =
  db.collection<Post>(COLLECTION_POST_NAME);

export { connectDB, postCollection };
