import { $, component$, useOnWindow, useSignal } from '@builder.io/qwik';
import styles from './header.module.css'
import ImageAvatar from '~/assets/images/avatar.png?w=40&h=40&jsx';
import ImageGithubWhite from '~/assets/images/github-mark-white.png?w=42&h=40&jsx';
import ImageGithubBlack from '~/assets/images/github-mark.png?w=42&h=40&jsx';
import { Link } from '@builder.io/qwik-city';
import { NavBar } from './navbar';
import { IconButton } from '../IconButton';

export const Header = component$(() => {
  const hasScrolled = useSignal(false);

  useOnWindow('scroll', $(() => {
    hasScrolled.value = window.scrollY > 70;
  }))

  return (
    <div class={[styles.container, hasScrolled.value ? styles['container-scrolled'] : '']}>
      <div class={styles.content}>
        <Link href="/">
          <ImageAvatar alt='Small user avatar' class="rounded" />
        </Link>
        <NavBar class={hasScrolled.value ? styles['navbar-scrolled'] : ''} />
        <IconButton href='https://github.com/schrankian/portfolio' class="hover-shadow rounded-full">
          <ImageGithubWhite alt='GitHub logo (dark mode)' q:slot='icon-dark'/>
          <ImageGithubBlack alt='GitHub logo (light mode)' q:slot='icon-light'/>
        </IconButton>
      </div>
    </div>
  );
});
