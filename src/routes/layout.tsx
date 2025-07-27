import { component$, Slot } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { SettingsProvider } from '~/components/SettingsProvider';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { BackgroundCanvas } from '~/components/BackgroundCanvas';

// ----------------------------------------------------------------
// Root Layout Component
// ----------------------------------------------------------------

export default component$(() => {
	return (
		<SettingsProvider>
			<Header />
			<BackgroundCanvas class="min-h-half col cross-axis-center pt-5 pb-5 relative" points={70}>
				<Slot />
			</BackgroundCanvas>
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