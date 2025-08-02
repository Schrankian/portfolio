import type { RequestHandler } from '@builder.io/qwik-city';
import { getMenu } from '~/utils/parse_menu';
import { XMLBuilder } from 'fast-xml-parser';
import type { RssRoot, Item } from './rss';

export const onGet: RequestHandler = (server) => {
  const menu = getMenu();

  const blogEntries = menu.blog?.items || [];
  const projectEntries = menu.projects?.items || [];

  const WEBSITE_PREFIX = 'https://www.fabianschuster.net/';

  const feed: RssRoot = {
    rss: {
      '@_xmlns:dc': 'http://purl.org/dc/elements/1.1/',
      '@_xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      '@_xmlns:atom': 'http://www.w3.org/2005/Atom',
      '@_version': '2.0',
      channel: {
        title: 'Fabian Schuster - Feed',
        link: 'https://www.fabianschuster.net/feed',
        description: 'This feed is under construction',
        item: [
          ...blogEntries.map(item => ({
            title: item.title,
            link: WEBSITE_PREFIX + item.link,
            description: item.description
          } as Item)),
          ...projectEntries.map(item => ({
            title: item.title,
            link: WEBSITE_PREFIX + item.link,
            description: item.description,
          } as Item))
        ]
      }
    }
  };

  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false
  });

  const xml = builder.build(feed);

  server.headers.set('Content-Type', 'application/xml; charset=utf-8');
  server.send(200, xml);
};