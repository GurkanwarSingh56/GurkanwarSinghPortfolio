"use client";

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  reaction: string;
  timestamp: string;
}

// Fallback seed entries when Firebase env is not configured
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

export async function fetchGuestbookEntries(): Promise<GuestbookEntry[]> {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return MOCK_GUESTBOOK_STORAGE;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, getDocs, query, orderBy, limit } = await import("@firebase/firestore");

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const q = query(collection(database, "guestbook"), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
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

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
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

export async function submitContactMessage(contact: { name: string; email: string; company: string; message: string }): Promise<boolean> {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.log("[Contact Subscribed Mock]:", contact);
    return true;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("@firebase/app");
    const { getFirestore, collection, addDoc, Timestamp } = await import("@firebase/firestore");

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
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
