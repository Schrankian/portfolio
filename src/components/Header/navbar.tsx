import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

export interface Route {
	path: string;
	label: string;
	sub: Array<{
		path: string;
		label: string;
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
			  <>
				<Link href={route.path} class={[styles.item, isActive(route.path) ? styles.active : '']} key={route.path}>
				  {route.label}
				</Link>
			  </>
			))
		  }
		</div>
	);
});