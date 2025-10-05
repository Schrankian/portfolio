import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import styles from "./header.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";
import { GoChevronRight24, GoThreeBars16, GoX16 } from "@qwikest/icons/octicons";
import { getMenu, MenuNode } from "~/utils/parse_menu";

export interface Route {
	path: string;
	label: string;
	sub: Array<{
		path: string;
		label: string;
		description?: string;
	}>;
}

const getRoutes = (menuData: MenuNode) => [
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
		sub: menuData.projects?.items.map(item => ({
			path: `/${item.link}`,
			label: item.title,
			description: item.description
		})) || []
	},
	{
		path: "/blog",
		label: "Blog",
		sub: menuData.blog?.items.map(item => ({
			path: `/${item.link}`,
			label: item.title,
			description: item.description
		})) || []
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
	const routes = getRoutes(getMenu());
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
										<GoChevronRight24 />
										<div>
											<h5>{sub.label}</h5>
											{sub.description && <span class={styles.description}>{sub.description}</span>}
										</div>
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

// TODO add animation
export const NavBarMobile = component$<NavBarProps>((props) => {
	const location = useLocation();
	const isActive = (path: string) => {
		if (path === '/') {
			return location.url.pathname === '/';
		}
		return location.url.pathname.includes(path);
	};
	const routes = getRoutes(getMenu());
	const menuIsOpen = useSignal(false);

	// Close the menu when clicking outside
	useOnDocument('touchstart', $(event => {
		const target = event.target as HTMLElement;
		if (!target.closest(`.${styles.navbarMobileContainer}`)) {
			menuIsOpen.value = false;
		}
	}));

	return (
		<div class={[styles.navbarMobileContainer, props.class]}>
			{
				menuIsOpen.value ?
					<GoX16 class={styles.burgerIcon} onClick$={() => menuIsOpen.value = !menuIsOpen.value} />
					: <GoThreeBars16 class={styles.burgerIcon} onClick$={() => menuIsOpen.value = !menuIsOpen.value} />
			}
			<div class={[styles.navbarMobile, !menuIsOpen.value ? "display-none" : ""]}>
				{
					routes.map(route => (
						<Link href={route.path} class={[styles.itemMobile, isActive(route.path) ? styles.active : '']} key={route.path}>
							<GoChevronRight24 />
							{route.label}
						</Link>
					))
				}
			</div>
		</div>
	);
});