import { useContent } from "@builder.io/qwik-city";

interface MenuItem {
	title: string;
	description: string;
	author: string;
	date: Date;
	link: string;
}

interface MenuGroup {
	type: "group";
	items: Record<string, MenuNode>;
}

interface MenuLeaf {
	type: "leaf";
	items: MenuItem[];
}

type MenuNode = MenuGroup | MenuLeaf;

interface ItemsObject {
	text: string;
	items?: ItemsObject[];
	href?: string;
}

function addItems(items: ItemsObject[]): MenuNode {
	const isLeaf = items.every(item =>
		item.items?.every(sub => sub.items === undefined)
	);

	if (isLeaf) {
		return {
			type: "leaf",
			items: items.map(item => ({
				title: item.items?.[0]?.text || "",
				link: item.items?.[0]?.href || "",
				description: item.items?.[1]?.text || "",
				author: item.items?.[2]?.text || "",
				date: new Date(item.items?.[3]?.text || "")
			}))
		};
	} else {
		const groups: Record<string, MenuNode> = {};
		for (const item of items) {
			groups[item.text] = addItems(item.items || []);
		}
		return { type: "group", items: groups };
	}
}

/**
 * Get the menu structure.
 * > Must be called within a Qwik component!
 * @returns A record of menu nodes keyed by their names.
 */
export function useMenu(): Record<string, MenuNode> {
	const { menu } = useContent();

	if (!menu || menu.text !== "Root" || !menu.items) {
		return {};
	}

	const rootNode = addItems(menu.items);

	if (rootNode.type !== "group") {
		throw new Error("There was an error parsing the menu structure. It had no top-level group.");
	}
	
	return rootNode.items;
}
