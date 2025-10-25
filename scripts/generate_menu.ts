import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, relative } from "path";

interface MenuItem {
	title: string;
	description: string;
	author: string;
	date: Date;
	link: string;
	blogLayout: boolean;
}

interface MenuNode {
	[key: string]: MenuNode | MenuItem[] | undefined;
	items: MenuItem[];
}

const ROOT_DIR = join(__dirname, "..", "src", "routes");

/**
 * Scan a directory recursively for .mdx files.
 * @param dir Directory to scan for .mdx files
 * @returns Array of .mdx file paths
 */
function scanDir(dir: string): string[] {
	let files: string[] = [];
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		const stats = statSync(fullPath);
		if (stats.isDirectory()) {
			files = files.concat(scanDir(fullPath));
		} else if (entry.endsWith("index.mdx")) {
			files.push(fullPath);
		}
	}
	return files;
}

/**
 * Parse frontmatter from a markdown file.
 * @param content Content of the markdown file
 * @returns Parsed frontmatter as key-value pairs
 */
function parseFrontmatter(content: string): Record<string, string> {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return {};
	const yaml = match[1];
	const data: Record<string, string> = {};
	yaml.split("\n").forEach(line => {
		const [key, ...rest] = line.split(":");
		if (key && rest.length) {
			data[key.trim()] = rest.join(":").trim();
		}
	});
	return data;
}

/**
 * Add an item to the menu tree.
 * @param tree The menu directory tree
 * @param pathParts Parts of the file path
 * @param meta Metadata from the frontmatter
 * @param relativePath Relative path to the file
 */
function addToTree(tree: MenuNode, pathParts: string[], meta: Record<string, string>, relativePath: string) {
	// If there are only two parts left, it's a leaf node as its in the format: "name/index.mdx"
	if (pathParts.length === 1) {
		if (relativePath.split("/").at(-1)?.startsWith("_")) return; // Skip items with titles starting with "_"
		tree.items.push({
			title: meta.title || "Untitled",
			description: meta.description || "",
			author: meta.author || "",
			date: new Date(meta.date || ""),
			link: relativePath,
			blogLayout: meta.showInHeader === "true" && meta.mdxLayout === "true"
		});
	} else {
		const dirName = pathParts[0];
		if (dirName === "items") {
			console.error("A directory named 'items' was found in the menu structure. This is not allowed.");
			return;
		}
		let sub = tree[dirName] as MenuNode;
		if (!sub) {
			sub = { items: [] } as MenuNode;
			tree[dirName] = sub;
		}
		addToTree(sub, pathParts.slice(1), meta, relativePath);
	}
}

/**
 * Build the menu structure from the scanned files.
 * @returns The complete menu structure as a MenuNode
 */
function buildMenu(): MenuNode {
	const files = scanDir(ROOT_DIR);
	const tree: MenuNode = { items: [] };

	for (const file of files) {
		const rel = relative(ROOT_DIR, file).replace(/\\\\?/g, "/").replace("/index.mdx", "");
		const parts = rel.split("/");
		const content = readFileSync(file, "utf-8");
		const meta = parseFrontmatter(content);
		
		addToTree(tree, parts, meta, rel);
	}

	return tree;
}


function main() {
	const outputPath = process.argv[2];
	if (!outputPath) {
		console.error("Usage: bun scripts/generate_menu.ts <output-path>");
		process.exit(1);
	}

	const menu = buildMenu();
	writeFileSync(outputPath, JSON.stringify(menu, null, 2), "utf-8");
	console.log(`Menu written to ${outputPath}`);
}

main();
