import menuData from "~/assets/data/menu.json";
import z from "zod";

interface MenuItem {
	title: string;
	description: string;
	author: string;
	date: Date;
	link: string;
	blogLayout: boolean;
}

export type MenuNode = {
	items: MenuItem[];
} & {
	[K in Exclude<string, "items">]?: MenuNode | undefined;
};

const MenuNodeSchema: z.ZodType<MenuNode> = z.lazy(() =>
	z.object({
		items: z.array(z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			date: z.coerce.date(),
			link: z.string(),
			blogLayout: z.boolean()
		})),
	}).catchall(MenuNodeSchema.optional())
);

/**
 * Get the typed menu structure, generated at compile time.
 * @returns A record of menu nodes keyed by their names.
 */
export function getMenu(): MenuNode{
	return MenuNodeSchema.parse(menuData);
}
