/**
 * Types for RSS 2.0 feed, matching http://www.rssboard.org/rss-specification
 */

type XmlText = string | null;
type XmlNumber = number | string | null;
type Extensions = Record<string, unknown>;

/**
 * <category> may be a simple string, 
 * or an object if it has a domain attribute.
 */
export type Category =
	| XmlText
	| {
		'#text': XmlText;
		'@_domain'?: string;
		[ext: string]: unknown;
	};

/** <cloud> element: empty with required attributes */
export interface Cloud {
	'@_domain': string;
	'@_port': XmlNumber;
	'@_path': string;
	'@_protocol': 'xml-rpc' | 'soap' | string;
	'@_registerProcedure': string;
	[ext: string]: unknown;
}

/** <image> element */
export interface Image {
	title: XmlText;
	url: XmlText;
	link: XmlText;
	description?: XmlText;
	height?: XmlNumber;
	width?: XmlNumber;
	[ext: string]: unknown;
}

/** <textInput> element */
export interface TextInput {
	title: XmlText;
	description: XmlText;
	name: XmlText;
	link: XmlText;
	[ext: string]: unknown;
}

/** <skipDays> element */
export interface SkipDays {
	day?: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>;
	[ext: string]: unknown;
}

/** <skipHours> element */
export interface SkipHours {
	hour?: Array<number | string>;
	[ext: string]: unknown;
}

/** <enclosure> element inside <item> */
export interface Enclosure {
	'@_url': string;
	'@_length': XmlNumber;
	'@_type': string;
	[ext: string]: unknown;
}

/** <guid> element (may have isPermaLink attribute) */
export interface Guid {
	'#text'?: XmlText;
	'@_isPermaLink'?: boolean | 'true' | 'false';
	[ext: string]: unknown;
}

/** <source> element inside <item> */
export interface Source {
	'#text'?: XmlText;
	'@_url': string;
	[ext: string]: unknown;
}

/**
 * Individual <item> in the feed
 * Title or description is required (type enforces both optional,
 * but you can enforce at runtime).
 */
export interface Item {
	title?: XmlText;
	link?: XmlText;
	description?: XmlText;
	author?: XmlText;
	category?: Category | Category[];
	comments?: XmlText;
	enclosure?: Enclosure;
	guid?: Guid;
	pubDate?: XmlText;
	source?: Source;
	// allow namespaced extensions or unknown extra elements
	[ext: string]: unknown;
}

/**
 * <channel> container for items and metadata
 * Matches all required and optional <channel> children.
 */
export interface Channel {
	title: XmlText;           // required
	link: XmlText;            // required
	description: XmlText;     // required

	language?: XmlText;
	copyright?: XmlText;
	managingEditor?: XmlText;
	webMaster?: XmlText;
	pubDate?: XmlText;
	lastBuildDate?: XmlText;
	category?: Category | Category[];
	rating?: XmlText;
	docs?: XmlText;
	generator?: XmlText;
	cloud?: Cloud;
	ttl?: XmlNumber;
	image?: Image;
	textInput?: TextInput;
	skipHours?: SkipHours;
	skipDays?: SkipDays;

	item?: Item[]; // zero or more items go after all other fields
	[ext: string]: unknown;
}

/**
 * The root of the RSS feed
 * Uses fast-xml-parser style "@_" for attributes.
 */
export interface RssRoot {
	rss: {
		'@_version': '2.0';
		// common namespaces; you can add more if needed
		'@_xmlns:content'?: string;
		'@_xmlns:dc'?: string;
		'@_xmlns:atom'?: string;
		channel: Channel;
		[ext: string]: unknown;
	};
}
