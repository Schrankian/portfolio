import { component$, Slot } from '@builder.io/qwik';
import styles from './tooltip.module.css';

export interface TooltipProps {
  /**
   * The text to display in the tooltip.
   */
  text: string;
}

export const Tooltip = component$<TooltipProps>((props) => {
  return (
    <div class={styles.tooltip}>
      <Slot />
      <span class={styles.tooltiptext}>
        {props.text}
      </span>
    </div>
  );
});
