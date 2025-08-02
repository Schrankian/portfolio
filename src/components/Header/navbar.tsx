import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

export interface Route {
	path: string;
	label: string;
	sub: Array<{
		path: string;
		label: string;
		description?: string;
	}>;
}

const routes: Route[] = [
	{
		path: "/",
		label: "Home",
		sub: []
	},
	{
		path: "/about",
		label: "About",
		sub: []
	},
	{
		path: "/projects",
		label: "Projects",
		sub: [
			// {
			// 	path: "/projects/campus-dual-app",
			// 	label: "Campus Dual App",
			// 	description: "A mobile app for managing university tasks."
			// },
			// {
			// 	path: "/projects/wordle-clone",
			// 	label: "Wordle Clone",
			// 	description: "A clone of the popular word puzzle game."
			// },
			// {
			// 	path: "/projects/portfolio-website",
			// 	label: "Portfolio Website",
			// 	description: "My personal portfolio website."
			// },
			// {
			// 	path: "/projects/connect-four-calculator",
			// 	label: "Connect Four for Calculator",
			// 	description: "A connect four game implemented on a calculator."
			// },
			// {
			// 	path: "/projects/neural-network-rust",
			// 	label: "Neural Network in Rust",
			// 	description: "A simple neural network implementation in Rust."
			// }
		]
	},
	{
		path: "/blog",
		label: "Blog",
		sub: []
	},
	{
		path: "/contact",
		label: "Contact",
		sub: []
	}
]

export interface NavBarProps {
	/**
	 * Add additional CSS classes to the navbar.
	 */
	class?: string;
}

export const NavBar = component$<NavBarProps>((props) => {
	const location = useLocation();
	const isActive = (path: string) => {
		if (path === '/') {
			return location.url.pathname === '/';
		}
		return location.url.pathname.includes(path);
	};
	return (
		  <div class={[styles.navbar, props.class]}>
		  {
			routes.map(route => (
			  <div class={styles.menuWrapper} key={route.path}>
				<Link href={route.path} class={[styles.item, isActive(route.path) ? styles.active : '']}>
				  {route.label}
				</Link>
				<div class={route.sub.length > 0 ? styles.submenu : ''}>
					{
						route.sub.map(sub => (
							<Link href={sub.path} class={[styles.subitem, isActive(sub.path) ? styles.active : '']} key={sub.path}>
								{sub.label}
								{sub.description && <span class={styles.description}>{sub.description}</span>}
							</Link>
						))
					}
				</div>
			  </div>
			))
		  }
		</div>
	);
});