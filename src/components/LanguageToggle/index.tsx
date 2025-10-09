import { $, component$, getLocale } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';
import styles from './languageToggle.module.css'

export const setLang = server$(
  function (lang: string) {
    this.cookie.set('locale', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return true;
  }
);

export const LanguageToggle = component$(() => {
  const lang = getLocale();

  const handleLanguageChange = $(async (newLang: string) => {
    await setLang(newLang);
    window.location.href = window.location.origin + window.location.pathname + `?locale=${newLang}`;
  });

  return (
    <div class={styles.toggleWrapper} aria-label="Language Selector">
      <button
        class={[styles.toggleButton, lang === 'en' ? styles.active : '']}
        onClick$={() => handleLanguageChange('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        class={[styles.toggleButton, lang === 'de' ? styles.active : '']}
        onClick$={() => handleLanguageChange('de')}
        aria-label="Wechsel zu Deutsch"
      >
        DE
      </button>
    </div>
  );
});
