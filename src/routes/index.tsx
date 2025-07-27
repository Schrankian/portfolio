import { $, component$ } from '@builder.io/qwik';
import styles from './home.module.css'
import { GoChevronDown24 } from '@qwikest/icons/octicons';
import ImageAvatar from '~/assets/images/avatar.png?w=300&h=300&jsx';
import { SocialLinks } from '~/components/SocialLinks';

export default component$(() => {
  const scrollDown = $(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  })

  return (
    <>
      <div class={styles.main}>
        <div class={styles.box}>
          <div class={styles.left}>
            <h1 class={styles.title}>Hello, I'm <span class="text-primary">Fabian</span></h1>
            <p class={styles.description}>
              A passionate developer with a love for creating everything that comes to mind.
            </p>
            <SocialLinks />
          </div>
          <ImageAvatar alt='Large user avatar' class="rounded-full"/>
        </div>
        <div class={styles.quote}>
            "The only way to do great work is to love what you do." - Steve Jobs
        </div>
        <GoChevronDown24 onClick$={scrollDown} class={styles.chevron} />
      </div>
      <div class={styles.content}>
        content
      </div>
    </>
  );
});