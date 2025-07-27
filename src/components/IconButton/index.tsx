import { ClassList, component$, Signal, Slot, useContext } from '@builder.io/qwik';
import { SettingsContext } from '../SettingsProvider';

export interface IconButtonProps {
  href: string;
  class?: ClassList | Signal<ClassList>;
  ariaLabel?: string;
}

export const IconButton = component$<IconButtonProps>((props) => {
  const { darkMode } = useContext(SettingsContext); 
  return (
    <a aria-label={props.ariaLabel} href={props.href} target='_blank' class={props.class} rel="noopener noreferrer">
      <Slot />
      {
        darkMode ? 
          <Slot name="icon-dark" />
          :
          <Slot name="icon-light" />
      }
    </a>
  );
}); 
