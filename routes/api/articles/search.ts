import { useStorage } from '#imports';
import Fuse from 'fuse.js';

export default defineEventHandler(async (event) => {
  const query = await getQuery(event);
  const q = query.q;

  if (!q) {
    return new Error('q get param is required');
  }

  const articles = await useStorage('assets:server').getItem(
    `db/articles.json`
  );

  const options = {
    includeScore: true,
    keys: ['prenom', 'nom', 'description'],
  };

  const fuse = new Fuse(articles, options);

  const results = fuse.search(q);

  if (!results) {
    return new Error('Error while searching for results');
  }

  return results.map((result) => result.item);
});
