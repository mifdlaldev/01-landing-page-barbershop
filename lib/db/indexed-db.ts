/**
 * Showcase: discriminated unions + type-safe IndexedDB
 */
import { type IDBPDatabase, openDB } from "idb";

export type StoredBooking = {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  name: string;
  whatsapp: string;
  notes?: string;
  createdAt: number;
};

const DB_NAME = "slowcuts";
const STORE = "bookings";
const VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb(): Promise<IDBPDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB not available"));
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: "id" });
          store.createIndex("createdAt", "createdAt");
        }
      },
    });
  }
  return dbPromise;
}

export async function saveBooking(b: StoredBooking): Promise<void> {
  const db = await getDb();
  await db.put(STORE, b);
}

export async function listBookings(): Promise<StoredBooking[]> {
  const db = await getDb();
  return db.getAllFromIndex(STORE, "createdAt");
}

export async function getBooking(id: string): Promise<StoredBooking | undefined> {
  const db = await getDb();
  return db.get(STORE, id);
}
