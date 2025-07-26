import {
  useContextProvider,
  createContextId,
  component$,
  Slot,
  useStore
} from '@builder.io/qwik';

export interface Settings {
  darkMode: boolean;
  language: string;
}

export const SettingsContext = createContextId<Settings>(
  'glob.settings-context'
);
export const SettingsProvider = component$(() => {
  const settings = useStore({
    darkMode: false,
    language: 'en'
  });

  useContextProvider(SettingsContext, settings);

  return <Slot />;
});
