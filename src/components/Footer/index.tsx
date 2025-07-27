import { component$ } from '@builder.io/qwik';
import { DarkModeToggle } from '../DarkModeToggle';
import styles from './footer.module.css';
import { Link } from '@builder.io/qwik-city';

export const Footer = component$(() => {
  return (
    <div class={styles.container}>
      <div class={[styles.content]}>
          <div class="row cross-axis-center">
            <a href='/feed'>RSS Feed</a>
            <div class={styles.spacer} />
            <Link href='/privacy'>Privacy Policy</Link>
          </div>
      </div>
      <div class={styles.divider} />
      <div class={styles.content}>
        <p class={styles.text}>© 2025 Fabian Schuster. All rights reserved.</p>
        <DarkModeToggle />
      </div>
    </div>
  );
});
