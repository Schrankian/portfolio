import {
  component$,
  createContextId,
  getLocale,
  Signal,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import {SUPPORTED_LOCALES} from '../../i18n';
import { arrayEquals } from '~/utils/common';
import { useLocation } from '@builder.io/qwik-city';

// Context holds a reactive array of all registered languages
export const LanguageContext = createContextId<Signal<string[]>>('mdx.language-context');

export interface LanguageFilterProps {
  lang: string;
  fallbackFor?: string[];
}

// Individual language blocks
export const LanguageFilter = component$<LanguageFilterProps>(({ lang: filterLang, fallbackFor }) => {
  const registeredLangs = useContext(LanguageContext);
  const currentLang = getLocale();
  const filterLangs = [filterLang, ...(fallbackFor ?? [])];

  // Register this language
  useTask$(() => {
    for (const lang of filterLangs) {
      if (!registeredLangs.value.includes(lang)) {
        registeredLangs.value = [...registeredLangs.value, lang]; // assign new array
      }
    }
  })

  if (filterLangs.includes(currentLang)) {
    return <>
      {
        filterLang !== currentLang && (
          <blockquote class="warn">
            <p>
              {$localize`This section is not available in your selected language. So it's shown in the original language instead.`}
            </p>
          </blockquote>
        )
      }
      <Slot />
    </>;
  }

  return null;
});

// Not really needed, but validates if all languages are registered
export const Translation = component$(() => {
  const registeredLangs = useSignal<string[]>([]);
  useContextProvider(LanguageContext, registeredLangs);
  const {url} = useLocation()

  useTask$(({ track }) => {
    const langs = track(() => registeredLangs.value);
    if (langs.length !== 0 && !arrayEquals(langs, SUPPORTED_LOCALES)) {
      console.warn(`[Translation] ${url.pathname} Missing translations for languages: ${SUPPORTED_LOCALES.filter(
        (lang) => !langs.includes(lang)
      ).join(', ')}`);
    }
  });
  return <Slot />;
});
