import { component$, Slot, useStore, useTask$ } from '@builder.io/qwik';

export interface ConditionalProps {
 condition: boolean;
}

/**
 * Renders its children only if the specified condition is true. 
 * Use this if the condition is calculated eagerly and may finish while SSR is happening.
 * > The only thing this component does is to wait until the component is mounted on the client side,
 * > and then checks the condition to decide whether to render the children or not.
 */
export const Conditional = component$<ConditionalProps>(({condition}) => {
  const state = useStore({ mounted: false });

  useTask$(() => {
    state.mounted = true;
  });

  return state.mounted && condition ? <Slot /> : null;
});
