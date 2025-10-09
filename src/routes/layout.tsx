import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { BackgroundCanvas } from '~/components/BackgroundCanvas';
import { RequestHandler, useDocumentHead } from '@builder.io/qwik-city';
import { extractLang } from "~/i18n";

// ----------------------------------------------------------------
// Root Layout Component
// ----------------------------------------------------------------

export const onRequest: RequestHandler = ({ locale, request, url, cookie }) => {
	locale(extractLang(request, url, cookie));
};

export default component$(() => {
	// Contains data if current page is a MDX file
	const { frontmatter } = useDocumentHead();

	return (
		<div class="min-h-screen col"> {/* Allow the children to position themselves in the viewport*/}
			<Header />
			<div class="col cross-axis-center pt-5 pb-5 relative">
				<BackgroundCanvas points={100} maxPoints={200} />
				{
					frontmatter?.mdxLayout ?
						<div class={frontmatter?.class ?? 'defaultMDX'}>
							<Slot />
						</div>
						:
						<Slot />
				}
			</div>
			<Footer />
		</div>
	);
});
