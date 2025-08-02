import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';

export const MDXHeader = component$(() => {
  const head = useDocumentHead();

  const title = head.title;
  const description = head.meta.find(meta => meta.name === 'description')?.content;

  if (!title || !description) {
    return null; // Return null if title or description is not available
  }

  return (
    <header>
      <h1>{title}</h1>
      <p class="text-on-muted">{description}</p>
      <div class="divider-horizontal" />
    </header>
  );
});
