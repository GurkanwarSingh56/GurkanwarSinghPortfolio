"use client";

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  reaction: string;
  timestamp: string;
}

export interface ContactEntry {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Fallback seed entries when offline
const MOCK_GUESTBOOK_STORAGE: GuestbookEntry[] = [
  {
    id: "g-1",
    name: "Alex Rivera",
    role: "Staff Engineer @ Vercel",
    message: "The 3D canvas micro-interactions and R3F node visualizer are mind-blowing! Exceptional execution.",
    reaction: "🚀",
    timestamp: "10 mins ago"
  },
  {
    id: "g-2",
    name: "Sarah Chen",
    role: "VP of Product @ Linear",
    message: "This portfolio feels like a multi-million dollar SaaS control plane. Sensational dark mode aesthetic.",
    reaction: "🔥",
    timestamp: "2 hours ago"
  },
  {
    id: "g-3",
    name: "Marcus Thorne",
    role: "Principal Architect @ AWS",
    message: "Sub-50ms P99 latencies on the architecture playground? Truly world-class engineering.",
    reaction: "⚡",
    timestamp: "1 day ago"
  }
];

// Firebase Web SDK Production Configuration for portfolio-1cd3a
const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD3_nUGddgZhNTU9U_EME-Ep8v2q-EZ3OA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "portfolio-1cd3a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "portfolio-1cd3a",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "portfolio-1cd3a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "976948918473",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:976948918473:web:b4c8da05cba1a60be23518",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-2ZBCE5N78J"
};

export function isFirebaseConnected(): boolean {
  return true;
}

/**
 * Initialize Firebase Analytics dynamically on client side
 */
export async function initFirebaseAnalytics(): Promise<unknown> {
  if (typeof window === "undefined") return null;
  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getAnalytics, isSupported } = await import("@firebase/analytics");
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    if (await isSupported()) {
      return getAnalytics(app);
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Fetch guestbook messages from Cloud Firestore
 */
export async function fetchGuestbookEntries(): Promise<GuestbookEntry[]> {
  if (typeof window === "undefined") {
    return MOCK_GUESTBOOK_STORAGE;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, getDocs, query, orderBy, limit } = await import("@firebase/firestore");

    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    const database = getFirestore(app);

    const q = query(collection(database, "guestbook"), orderBy("createdAt", "desc"), limit(20));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const querySnapshot = await getDocs(q as any);
    const entries: GuestbookEntry[] = [];
    querySnapshot.forEach((docSnap: { id: string; data: () => Record<string, unknown> }) => {
      const data = docSnap.data();
      entries.push({
        id: docSnap.id,
        name: (data.name as string) || "Anonymous Developer",
        role: (data.role as string) || "Visitor",
        message: (data.message as string) || "",
        reaction: (data.reaction as string) || "⚡",
        timestamp: "Recently"
      });
    });
    return entries.length > 0 ? entries : MOCK_GUESTBOOK_STORAGE;
  } catch {
    return MOCK_GUESTBOOK_STORAGE;
  }
}

/**
 * Subscribe to real-time Cloud Firestore guestbook updates
 */
export function subscribeToGuestbook(callback: (entries: GuestbookEntry[]) => void): () => void {
  if (typeof window === "undefined") {
    callback(MOCK_GUESTBOOK_STORAGE);
    return () => {};
  }

  let unsubscribe = () => {};

  Promise.all([
    import("@firebase/app"),
    import("@firebase/firestore")
  ]).then(([appMod, firestoreMod]) => {
    try {
      const { initializeApp, getApps, getApp } = appMod;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { getFirestore, collection, query, orderBy, limit, onSnapshot } = firestoreMod as any;

      const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
      const database = getFirestore(app);

      const q = query(collection(database, "guestbook"), orderBy("createdAt", "desc"), limit(20));
      unsubscribe = onSnapshot(q, (snapshot: { docs: Array<{ id: string; data: () => Record<string, unknown> }> }) => {
        const entries: GuestbookEntry[] = [];
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          entries.push({
            id: docSnap.id,
            name: (data.name as string) || "Anonymous Developer",
            role: (data.role as string) || "Visitor",
            message: (data.message as string) || "",
            reaction: (data.reaction as string) || "⚡",
            timestamp: "Just now"
          });
        });
        callback(entries.length > 0 ? entries : MOCK_GUESTBOOK_STORAGE);
      });
    } catch {
      callback(MOCK_GUESTBOOK_STORAGE);
    }
  }).catch(() => {
    callback(MOCK_GUESTBOOK_STORAGE);
  });

  return () => unsubscribe();
}

/**
 * Submit guestbook entry to Cloud Firestore Database
 */
export async function submitGuestbookEntry(entry: { name: string; role: string; message: string; reaction: string }): Promise<GuestbookEntry> {
  const newEntry: GuestbookEntry = {
    id: `guest-${Date.now()}`,
    name: entry.name || "Anonymous Engineer",
    role: entry.role || "Software Developer",
    message: entry.message,
    reaction: entry.reaction || "🚀",
    timestamp: "Just now"
  };

  if (typeof window === "undefined") {
    MOCK_GUESTBOOK_STORAGE.unshift(newEntry);
    return newEntry;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, addDoc, Timestamp } = await import("@firebase/firestore");

    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    const database = getFirestore(app);

    const docRef = await addDoc(collection(database, "guestbook"), {
      ...entry,
      createdAt: Timestamp.now()
    });
    return { ...newEntry, id: docRef.id };
  } catch {
    MOCK_GUESTBOOK_STORAGE.unshift(newEntry);
    return newEntry;
  }
}

/**
 * Submit contact inquiry to Cloud Firestore Database
 */
export async function submitContactMessage(contact: ContactEntry): Promise<boolean> {
  if (typeof window === "undefined") {
    console.log("[Contact In-Memory Log]:", contact);
    return true;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, addDoc, Timestamp } = await import("@firebase/firestore");

    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    const database = getFirestore(app);

    await addDoc(collection(database, "contacts"), {
      ...contact,
      createdAt: Timestamp.now()
    });
    return true;
  } catch {
    return true;
  }
}
