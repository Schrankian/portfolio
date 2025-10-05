import {
  useContextProvider,
  createContextId,
  component$,
  Slot,
  useStore,
  useVisibleTask$
} from '@builder.io/qwik';

export interface Settings {
  darkMode: boolean;
  language: string;
  mobile: boolean;
}

export const SettingsContext = createContextId<Settings>(
  'glob.settings-context'
);
export const SettingsProvider = component$(() => {
  const settings = useStore({
    darkMode: false,
    language: 'en',
    mobile: true
  });

  useContextProvider(SettingsContext, settings);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const media = window.matchMedia('(max-width: 768px)');
    settings.mobile = media.matches;
    console.log('Initial mobile:', settings.mobile);
    const listener = (e: MediaQueryListEvent) => (settings.mobile = e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, { strategy: 'document-ready' });

  return <Slot />;
});
