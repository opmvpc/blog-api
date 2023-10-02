import { useStorage } from '#imports';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const articles = await useStorage('assets:server').getItem(
    `db/articles.json`
  );

  const article = articles.find((p) => p.id === Number.parseInt(id));

  if (!article) {
    return new Error('person not found');
  }
  return article;
});
