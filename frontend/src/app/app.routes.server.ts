import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

interface PrerenderParams {
  id: string;
}

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async (): Promise<Record<string, string>[]> => {
      const id = 'defaultId'; // Replace with appropriate logic to get the id
      return [{ id }];
    }
  },
];
