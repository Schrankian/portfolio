import { component$, Slot, useContext } from '@builder.io/qwik';
import { SettingsContext } from '../SettingsProvider';
import styles from './iconButton.module.css';

export interface IconButtonProps {
  href: string;
  noDefaultStyle?: boolean;
  class?: string;
  ariaLabel?: string;
}

export const IconButton = component$<IconButtonProps>((props) => {
  const { darkMode } = useContext(SettingsContext); 
  return (
    <a aria-label={props.ariaLabel} href={props.href} target='_blank' class={[props.class, !props.noDefaultStyle && styles.icon]} rel="noopener noreferrer" data-iconButton={true}>
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
