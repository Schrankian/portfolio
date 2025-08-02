import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      New route works.
    </div>
  );
});

export const head: DocumentHead = {
  title: 'About',
}