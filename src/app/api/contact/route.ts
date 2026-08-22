import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side validation
    const { name, email, company, message, honeypot } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Honeypot spam protection
    if (honeypot && honeypot.trim() !== '') {
      // Silently accept it to deceive the bot
      return NextResponse.json({ success: true, message: 'Spam rejected silently' }, { status: 200 });
    }

    if (!adminDb) {
      // Fallback for when Firebase Admin is not configured
      console.log('[Server Contact Log]:', { name, email, company, message });
      return NextResponse.json({ success: true, message: 'Logged locally' }, { status: 200 });
    }

    await adminDb.collection('contacts').add({
      name,
      email,
      company: company || '',
      message,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('API Error /contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
