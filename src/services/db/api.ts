import { adminDb } from '@/lib/firebaseAdmin';
import { 
  ProjectModel, 
  TimelineModel, 
  LeadershipModel, 
  TeachingModel, 
  CertificateModel, 
  SiteSettingsModel 
} from '@/types/models';

/**
 * Generic fetcher for published and ordered collections
 */
async function getPublishedOrderedCollection<T>(collectionName: string): Promise<T[]> {
  if (!adminDb) {
    console.warn(`[DB] Firebase Admin not initialized, returning empty array for ${collectionName}`);
    return [];
  }

  try {
    const snapshot = await adminDb
      .collection(collectionName)
      .where('published', '==', true)
      .orderBy('order', 'asc')
      .get();
      
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Serialize timestamps for Next.js Server Components passing to Client
      createdAt: doc.data().createdAt?.toMillis() || null,
      updatedAt: doc.data().updatedAt?.toMillis() || null,
    })) as T[];
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

export async function getProjects(): Promise<ProjectModel[]> {
  return getPublishedOrderedCollection<ProjectModel>('projects');
}

export async function getTimeline(): Promise<TimelineModel[]> {
  return getPublishedOrderedCollection<TimelineModel>('timeline');
}

export async function getLeadership(): Promise<LeadershipModel[]> {
  return getPublishedOrderedCollection<LeadershipModel>('leadership');
}

export async function getTeaching(): Promise<TeachingModel[]> {
  return getPublishedOrderedCollection<TeachingModel>('teaching');
}

export async function getCertificates(): Promise<CertificateModel[]> {
  return getPublishedOrderedCollection<CertificateModel>('certificates');
}

export async function getGlobalSiteSettings(): Promise<SiteSettingsModel | null> {
  if (!adminDb) return null;
  
  try {
    const doc = await adminDb.collection('siteSettings').doc('global').get();
    if (!doc.exists) return null;
    
    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      updatedAt: data.updatedAt?.toMillis() || null,
    } as SiteSettingsModel;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}
