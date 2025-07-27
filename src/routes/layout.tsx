import { component$, Slot } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { SettingsProvider } from '~/components/SettingsProvider';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';

export default component$(() => {
	return (
		<SettingsProvider>
			<Header />
			<div class="min-h-half col cross-axis-center pt-5 pb-5 relative">
				<Slot />
			</div>
			<Footer />
		</SettingsProvider>
	);
});

export const head: DocumentHead = {
	title: "Fabian Schuster",
	meta: [
		{
			name: "My Personal Portfolio",
			content: "This is my personal portfolio built with care.",
		},
	],
};