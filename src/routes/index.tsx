import { $, component$ } from '@builder.io/qwik';
import styles from './home.module.css'
import { GoChevronDown24 } from '@qwikest/icons/octicons';
import ImageAvatar from '~/assets/images/avatar.png?w=300&h=300&jsx';
import { SocialLinks } from '~/components/SocialLinks';
import { DocumentHead } from '@builder.io/qwik-city';

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
            <h1 class={styles.title}>
              Hey, {$localize`I'm`} <span class="text-primary">Fabian</span> <br />
              {$localize`A`} Full Stack &lt;{$localize`Developer`}&nbsp;/&gt;
            </h1>
            <p class={styles.description}>
              {$localize`With a love for creating everything that comes to mind.`}
            </p>
            <SocialLinks />
          </div>
          <div class={styles.right}>
            <ImageAvatar alt='Large user avatar' class={["rounded-full", styles.avatar]} />
          </div>
        </div>
        <div class={styles.quote}>
            "The only way to do great work is to love what you do." - Steve Jobs
        </div>
        <GoChevronDown24 onClick$={scrollDown} class={styles.chevron} />
      </div>
      <div class={styles.content}>
        {/* {$localize`I'm still deciding what to put here :D`} */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
	title: "Fabian Schuster",
  meta: [
    {
      name: "description",
      content: $localize`This is my personal portfolio built with care.`
    }
  ]
};