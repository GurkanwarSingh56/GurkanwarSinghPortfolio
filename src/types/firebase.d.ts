declare module "@firebase/app" {
  export interface FirebaseApp {
    name: string;
    options: Record<string, unknown>;
  }
  export function initializeApp(options: Record<string, unknown>): FirebaseApp;
  export function getApps(): FirebaseApp[];
  export function getApp(): FirebaseApp;
}

declare module "@firebase/firestore" {
  export interface Firestore {
    type: string;
  }
  export function getFirestore(app?: unknown): Firestore;
  export function collection(db: Firestore, path: string): unknown;
  export function query(...args: unknown[]): unknown;
  export function orderBy(field: string, direction?: string): unknown;
  export function limit(n: number): unknown;
  export function getDocs(query: unknown): Promise<{
    forEach(callback: (doc: { id: string; data(): Record<string, unknown> }) => void): void;
  }>;
  export function addDoc(collectionRef: unknown, data: Record<string, unknown>): Promise<{ id: string }>;
  export class Timestamp {
    static now(): Timestamp;
    seconds: number;
    nanoseconds: number;
  }
}
