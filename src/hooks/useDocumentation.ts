
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3001/api/documentation';

export interface DocSection {
  id: string;
  title: string;
  description?: string;
  content?: string;
}

export interface DocCategory {
  id: string;
  title: string;
  icon?: string;
  sections: DocSection[];
}

// Fetch documentation categories (lightweight)
export const useDocumentationCategories = () => {
  return useQuery({
    queryKey: ['documentation', 'categories'],
    queryFn: async (): Promise<DocCategory[]> => {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch documentation categories');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Fetch specific section content (heavy content loaded on demand)
export const useDocumentationSection = (sectionId: string | null) => {
  return useQuery({
    queryKey: ['documentation', 'section', sectionId],
    queryFn: async (): Promise<{ id: string; content: string }> => {
      if (!sectionId) throw new Error('Section ID is required');
      
      const response = await fetch(`${API_BASE_URL}/section/${sectionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch section content');
      }
      return response.json();
    },
    enabled: !!sectionId, // Only run query if sectionId exists
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

// Search documentation
export const useDocumentationSearch = (query: string) => {
  return useQuery({
    queryKey: ['documentation', 'search', query],
    queryFn: async (): Promise<{ results: DocSection[] }> => {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search documentation');
      }
      return response.json();
    },
    enabled: query.length > 2, // Only search if query is more than 2 characters
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
};
