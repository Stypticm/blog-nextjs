import { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

declare global {
  interface Window {
      wb: {
          messageSkipWaiting(): void;
          register(): void;
          addEventListener(name: string, callback: () => unknown): void;
      }
  }
}