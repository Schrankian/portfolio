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
			<div class="min-h-screen col"> {/* Allow the children to position themselves in the viewport*/}
				<Header />
				<BackgroundCanvas class="col cross-axis-center pt-5 pb-5 relative" points={70} maxPoints={150}>
					<Slot />
				</BackgroundCanvas>
				<Footer />
			</div>
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