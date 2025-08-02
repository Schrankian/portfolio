import { component$} from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import { useMenu } from "~/utils/parse_menu";
import styles from "./blog.module.css"

export default component$(() => {
	const {blog} = useMenu();

	if (!blog || blog.type !== "leaf") {
		throw new Error("Blog menu not found");
	}

	return (
		<div class="w-content">
			<h1>Blog</h1>
			<p>
				Welcome to my blog! Here I share my thoughts, experiences, and insights on various topics related to technology, programming, and more.
			</p>
			<p>
				Stay tuned for updates and feel free to reach out if you have any questions or suggestions!
			</p>
			{
				blog.items.map(item => (
					<Link href={item.link} key={item.link} class={styles.linkCard}>
						<h2>{item.title}</h2>
						<p class="text-text">{item.description}</p>
						<p>
							<small>
								{item.author} - {item.date.toLocaleDateString()}
							</small>
						</p>
					</Link>
				))
			}
		</div>
	);
});

export const head: DocumentHead = {
  title: 'Blog',
}