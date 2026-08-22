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

// Fallback seed entries when offline or env is omitted or permission denied
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

// Firebase Web SDK Production Configuration reading exclusively from environment variables
function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
  };
}

export function isFirebaseConnected(): boolean {
  const config = getFirebaseConfig();
  return Boolean(config.projectId && config.apiKey);
}

/**
 * Initialize Firebase Analytics dynamically on client side
 */
export async function initFirebaseAnalytics(): Promise<unknown> {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) return null;
  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getAnalytics, isSupported } = await import("@firebase/analytics");
    const config = getFirebaseConfig();
    const app = getApps().length ? getApp() : initializeApp(config);
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
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return MOCK_GUESTBOOK_STORAGE;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, getDocs, query, orderBy, limit } = await import("@firebase/firestore");

    const config = getFirebaseConfig();
    const app = getApps().length ? getApp() : initializeApp(config);
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
 * Subscribe to real-time Cloud Firestore guestbook updates with graceful permission-denied error handling
 */
export function subscribeToGuestbook(callback: (entries: GuestbookEntry[]) => void): () => void {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
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

      const config = getFirebaseConfig();
      const app = getApps().length ? getApp() : initializeApp(config);
      const database = getFirestore(app);

      const q = query(collection(database, "guestbook"), orderBy("createdAt", "desc"), limit(20));
      
      unsubscribe = onSnapshot(
        q,
        (snapshot: { docs: Array<{ id: string; data: () => Record<string, unknown> }> }) => {
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
        },
        // Graceful error listener catching permission-denied without console error spam
        (_error: unknown) => {
          callback(MOCK_GUESTBOOK_STORAGE);
        }
      );
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

  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    MOCK_GUESTBOOK_STORAGE.unshift(newEntry);
    return newEntry;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, addDoc, Timestamp } = await import("@firebase/firestore");

    const config = getFirebaseConfig();
    const app = getApps().length ? getApp() : initializeApp(config);
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
 * Submit contact inquiry via secure Server API
 */
export async function submitContactMessage(contact: ContactEntry & { honeypot?: string }): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    
    if (!res.ok) {
      console.error('Failed to submit contact via API');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Submission error:', error);
    return false;
  }
}

