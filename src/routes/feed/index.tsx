import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = (server) => {
  server.headers.set('Content-Type', 'application/xml; charset=utf-8');
  server.send(200, `
   <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
     <channel>
       <title>RSS Feed</title>
       <link>https://www.fabianschuster.net/feed</link>
       <description>This feed is under construction</description>
       <item>
         <title>In Progress</title>
         <link>https://www.fabianschuster.net/blog/posts/1</link>
         <description>This post doesnt exist yet</description>
       </item>
     </channel>
   </rss>
  `);
};