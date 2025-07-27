import { component$, useTask$, useVisibleTask$, isServer, useContext, $, useSignal } from '@builder.io/qwik';
import { SettingsContext } from '../SettingsProvider';
import { GoSun24, GoDeviceDesktop24, GoMoon24 } from '@qwikest/icons/octicons'; // You can swap this with lucide or another icon pack
import styles from './darkModeToggle.module.css';

export const RestoreColorScheme = () => (
  <script
    dangerouslySetInnerHTML={`(function () {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved === 'dark' || ((!saved || saved === 'system') && prefersDark);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    })();`}
  />
);

export const DarkModeToggle = component$(() => {
  const settings = useContext(SettingsContext);
  const mode = useSignal<'light' | 'system' | 'dark'>('light');

  // Load the saved theme from LocalStorage once its ready
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'system'| 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!saved) {
      mode.value = 'system';
      settings.darkMode = prefersDark;
    } else {
      mode.value = saved;
      settings.darkMode = saved === 'dark' || (saved === 'system' && prefersDark);
    }
  }, { strategy: 'document-ready' });

  useTask$(({ track }) => {
    track(() => mode.value);
    if (isServer) return;

    let applied = mode.value;
    if (mode.value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      settings.darkMode = prefersDark;
      applied = prefersDark ? 'dark' : 'light';
    } else {
      settings.darkMode = mode.value === 'dark';
    }

    document.documentElement.setAttribute('data-theme', applied);
    localStorage.setItem('theme', mode.value);
  });

  const updateMode = $((value: 'light' | 'system' | 'dark') => {
    mode.value = value;
  });

  return (
    <div class={styles.toggleWrapper} aria-label='Dark Mode Toggle'>
      <button
        class={[styles.toggleButton, mode.value === 'light' ? styles.active : '']}
        onClick$={() => updateMode('light')}
        aria-label="Light Mode"
      >
        <GoSun24 />
      </button>
      <button
        class={[styles.toggleButton, mode.value === 'system' ? styles.active : '']}
        onClick$={() => updateMode('system')}
        aria-label="System Mode"
      >
        <GoDeviceDesktop24 />
      </button>
      <button
        class={[styles.toggleButton, mode.value === 'dark' ? styles.active : '']}
        onClick$={() => updateMode('dark')}
        aria-label="Dark Mode"
      >
        <GoMoon24 />
      </button>
    </div>
  );
});
