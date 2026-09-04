// app/lib/server/mongodb.ts
import mongoose from "mongoose";
import dns from "node:dns";

// Unconditionally force Node.js to use Google & Cloudflare DNS to bypass local SRV lookup issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Add it to .env.local — use the same connection string your Node.js backend uses.",
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// eslint-disable-next-line no-var
declare global {
  // eslint-disable-next-line no-var
  var _magicCheckoutMongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._magicCheckoutMongoose ?? {
  conn: null,
  promise: null,
};

if (!global._magicCheckoutMongoose) {
  global._magicCheckoutMongoose = cached;
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}