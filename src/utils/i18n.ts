import "@angular/localize/init";
import { loadTranslations } from "@angular/localize";
import { getLocale, withLocale, useOnDocument, $ } from "@builder.io/qwik";
import { Cookie } from "@builder.io/qwik-city";
import type { RenderOptions } from "@builder.io/qwik/server";

// You must declare all your locales here
import EN from "../locales/message-en.json";
import DE from "../locales/message-de.json";
export const SUPPORTED_LOCALES = ["en", "de"];
// Make sure it's obvious when the default locale was selected
const defaultLocale = "de";

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
	console.log("	➜	Loading translations...");
	[EN, DE].forEach(({ translations, locale }) => {
		// withLocale sets the locale for the duration of the callback
		withLocale(locale, () => loadTranslations(translations));
	});
}

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
	TRANSLATIONS: Record<string, any>;
	TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
};

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale.
 */
if (!$localizeFn.TRANSLATION_BY_LOCALE) {
	$localizeFn.TRANSLATION_BY_LOCALE = new Map([["", {}]]);
	Object.defineProperty($localizeFn, "TRANSLATIONS", {
		get: function () {
			const locale = getLocale(defaultLocale);
			let translations = this.TRANSLATION_BY_LOCALE.get(locale);
			if (!translations) {
				this.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
			}
			return translations;
		},
	});
}

const validateLocale = (locale: string) => {
	if ($localizeFn.TRANSLATION_BY_LOCALE.has(locale)) return locale;
	const match = /^([^-;]+)[-;]/.exec(locale);
	return (
		(match && $localizeFn.TRANSLATION_BY_LOCALE.has(match[1]) && match[1]) ||
		undefined
	);
};

/**
 * Function used to examine the request and determine the locale to use.
 *
 * in this implementation, we accept a `?locale=xx` parameter to override
 * the auto-detected locale requested by the browser.
 *
 * This function is meant to be used with `RenderOptions.locale` property.
 * It must always return a valid locale so that prod clients will always get de-$localize-d js
 *
 * @returns The locale to use, which will be stored in the render context.
 */
export function extractLang(request: Request, url: URL, cookie: Cookie): string {
	// First check for query param. This will override everything else
	let locale = url.searchParams.get("locale") || undefined;
	if (locale) {
		// note that we mutate the URL here, this will update the search property
		url.searchParams.delete("locale");
		locale = validateLocale(locale);
		if (locale) {
			cookie.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
			return locale;
		};
	}

	// Second, check for the locale cookie
	locale = validateLocale(cookie.get("locale")?.value || "");
	if (locale) return locale;

	// Third, parse the browser accept-language header
	const locales = request.headers.get("accept-language")?.split(",");
	if (locales)
		for (const entry of locales) {
			// Dont store it in the cookie, it's not explicitely requested by the user
			locale = validateLocale(entry);
			if (locale) return locale;
		}

	// Finally, fallback to the default locale
	return defaultLocale;
}

/**
 * Function used to determine the base URL to use for loading the chunks in the browser.
 *
 * The function returns `/build` in dev mode or `/build/<locale>` in prod mode.
 *
 * This function is meant to be used with `RenderOptions.base` property
 *
 * @returns The base URL to use for loading the chunks in the browser.
 */
export function extractBase({ serverData }: RenderOptions): string {
	if (import.meta.env.DEV) {
		return "/build";
	} else {
		return "/build/" + serverData!.locale;
	}
}

export function useI18n() {
	if (import.meta.env.DEV) {
		// During development only, load all translations in memory when the app starts on the client.
		// eslint-disable-next-line qwik/use-method-usage
		useOnDocument("qinit", $(initTranslations));
	}
}

// We always need the translations on the server
if (import.meta.env.SSR) initTranslations();