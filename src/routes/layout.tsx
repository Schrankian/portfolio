import { component$, Slot } from '@builder.io/qwik';
import { SettingsProvider } from '~/components/SettingsProvider';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { BackgroundCanvas } from '~/components/BackgroundCanvas';
import { DocumentHead, useDocumentHead } from '@builder.io/qwik-city';

// ----------------------------------------------------------------
// Root Layout Component
// ----------------------------------------------------------------

export default component$(() => {
	// Contains data if current page is a MDX file
	const { frontmatter } = useDocumentHead();
	
	return (
		<SettingsProvider>
			<div class="min-h-screen col"> {/* Allow the children to position themselves in the viewport*/}
				<Header />
				<BackgroundCanvas class="col cross-axis-center pt-5 pb-5 relative" points={200} maxPoints={300}>
					{
						frontmatter?.mdxLayout ? 
						<div class={frontmatter?.class ?? 'defaultMDX'}>
							<Slot />
						</div>
						:
						<Slot />
					}
				</BackgroundCanvas>
				<Footer />
			</div>
		</SettingsProvider>
	);
});
