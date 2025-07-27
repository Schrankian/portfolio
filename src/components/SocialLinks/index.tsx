import { component$, Component } from '@builder.io/qwik';
import ImageGithubWhite from '~/assets/images/github-mark-white.png?w=40&h=40&jsx';
import ImageGithubBlack from '~/assets/images/github-mark.png?w=40&h=40&jsx';
import ImageLinkedInWhite from '~/assets/images/linkedin-logo-white.png?w=40&h=40&jsx';
import ImageLinkedInBlack from '~/assets/images/Linkedin-icon-black.png?w=40&h=40&jsx';
import { IconButton } from '../IconButton';

const Socials: Array<{
  name: string;
  url: string;
  iconLight: Component<any>;
  iconDark: Component<any>;
  alt: string;
  class?: string;
}> = [
  {
    name: 'GitHub',
    url: 'https://github.com/schrankian',
    iconLight: ImageGithubBlack,
    iconDark: ImageGithubWhite,
    alt: 'GitHub',
    class: 'github-icon',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/fabian-schuster-989077194/',
    iconLight: ImageLinkedInBlack,
    iconDark: ImageLinkedInWhite,
    alt: 'LinkedIn',
    class: 'linkedin-icon',
  }
];

export const SocialLinks = component$(() => {
  // TODO needs serious rework
  return (
    <div class="row gap-5">
      {Socials.map((social) => (
        <IconButton
          key={social.name}
          href={social.url}
          class={`hover-shadow rounded-full border ${social.class || ''}`}
          ariaLabel={`Link to ${social.name}`}
        >
          <social.iconLight alt={social.alt} q:slot="icon-light" />
          <social.iconDark alt={social.alt} q:slot="icon-dark" />
        </IconButton>
      ))}
    </div>
  );
});
