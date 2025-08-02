import { $, component$, useOnWindow, useSignal } from '@builder.io/qwik';
import styles from './header.module.css'
import ImageAvatar from '~/assets/images/avatar.png?w=40&h=40&jsx';
import ImageGithubWhite from '~/assets/images/github-mark-white.png?jsx';
import ImageGithubBlack from '~/assets/images/github-mark.png?jsx';
import { Link, useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { NavBar } from './navbar';
import { IconButton } from '../IconButton';

const MarkdownInfo = component$(() => {
  const head = useDocumentHead();
  const { url } = useLocation();
  
  const title = head.title || 'No title available';
  const description = head.meta.find(meta => meta.name === 'description')?.content || 'No description available';
  const author = head.meta.find(meta => meta.name === 'author')?.content || 'No author available';
  const route = url.pathname || 'No route available';

  return (
    <div class={styles.markdownInfo}>
      <div class={styles.left}>
        <p>{description}</p>
        <h5>{title}</h5>
      </div>
      <div class={styles.right}>
        <p>{route}</p>
        <h5>{author}</h5>
      </div>
    </div>
  );
})

export const Header = component$(() => {
  const hasScrolled = useSignal(false);
  const { frontmatter } = useDocumentHead();

  useOnWindow('scroll', $(() => {
    hasScrolled.value = window.scrollY > 70;
  }))

  return (
    <div class={[styles.container, hasScrolled.value ? styles.containerScrolled : '']}>
      <div class={styles.content}>
        <Link href="/">
          <ImageAvatar alt='Small user avatar' class="rounded" />
        </Link>
        {
          frontmatter?.showInHeader && hasScrolled.value ?
            <MarkdownInfo />
            : <NavBar class={hasScrolled.value ? styles.navbarScrolled : ''} />
        }
        <IconButton href='https://github.com/schrankian/portfolio' class="hover-shadow">
          <ImageGithubWhite alt='GitHub logo (dark mode)' q:slot='icon-dark' />
          <ImageGithubBlack alt='GitHub logo (light mode)' q:slot='icon-light' />
        </IconButton>
      </div>
    </div>
  );
});
