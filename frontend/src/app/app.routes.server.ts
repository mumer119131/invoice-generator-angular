import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'invoice/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams(): Promise<Record<string, string>[]> {
        return [
          { id: '123' }
        ];
    },
    fallback: PrerenderFallback.None
  }
];
