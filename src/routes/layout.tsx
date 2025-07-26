import { component$, Slot } from '@builder.io/qwik';
import { DarkModeToggle } from '~/components/DarkModeToggle';
import { DocumentHead } from '@builder.io/qwik-city';
import { SettingsProvider } from '~/components/SettingsProvider';

export default component$(() => {
	return (
		<SettingsProvider>
			<DarkModeToggle />
			{/* <Menu /> */}
			<Slot />
			{/* <Footer /> */}
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