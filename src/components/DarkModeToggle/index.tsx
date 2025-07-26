import { component$, useTask$, useVisibleTask$, isServer, useContext } from '@builder.io/qwik';
import { SettingsContext } from '../SettingsProvider';

export const RestoreColorScheme = () => (
  <script
    dangerouslySetInnerHTML={`
      (function () {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved === 'dark' || (!saved && prefersDark);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      })();
    `}
  />
)

export const DarkModeToggle = component$(() => {
  const settings = useContext(SettingsContext);

  // Runs only in browser, after hydration (client only)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    settings.darkMode = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  }, {strategy: 'document-ready'});

  // Reactively update document and storage when signal changes
  useTask$(({ track }) => {
    track(() => settings.darkMode);
    if (isServer) {
      return;
    }
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', settings.darkMode ? 'dark' : 'light');
  });

  return (
    <button onClick$={() => (settings.darkMode = !settings.darkMode)}>
      {settings.darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
});