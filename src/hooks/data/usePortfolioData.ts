import { useQuery } from '@tanstack/react-query';
import { ProjectModel, TimelineModel } from '@/types/models';

/**
 * These hooks are reserved for client-side interactions where data might 
 * need polling or refetching independent of the Next.js server render.
 * 
 * For initial page loads, data is fetched via Server Components (src/services/db/api.ts).
 */

export function useProjects(initialData?: ProjectModel[]) {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // In a real scenario, this might hit a Next.js API route that proxies to Firebase Admin
      const res = await fetch('/api/data/projects');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json() as Promise<ProjectModel[]>;
    },
    initialData,
  });
}

export function useTimeline(initialData?: TimelineModel[]) {
  return useQuery({
    queryKey: ['timeline'],
    queryFn: async () => {
      const res = await fetch('/api/data/timeline');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json() as Promise<TimelineModel[]>;
    },
    initialData,
  });
}

// Additional hooks can be implemented following this pattern if client fetching is required.
