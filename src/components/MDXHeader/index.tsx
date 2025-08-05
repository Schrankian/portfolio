import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';

export const MDXHeader = component$(() => {
  const head = useDocumentHead();

  const title = head.title;
  const description = head.meta.find(meta => meta.name === 'description')?.content;
  const date = new Date(head.frontmatter?.date);
  const author = head.meta.find(meta => meta.name === 'author')?.content || 'Unknown Author';

  if (!title || !description) {
    return null; // Return null if title or description is not available
  }

  return (
    <header>
      <h1>{title}</h1>
      <p class="text-on-muted">{description}</p>
      {date && (
        <p class="text-on-muted">
          <small>{author} - {date.toLocaleDateString()}</small>
        </p>
      )}
      <div class="divider-horizontal" />
    </header>
  );
});
