import { component$, Component } from '@builder.io/qwik';
import ImageGithubWhite from '~/assets/images/github-mark-white.png?jsx';
import ImageGithubBlack from '~/assets/images/github-mark.png?jsx';
import ImageLinkedInWhite from '~/assets/images/linkedin-logo-white.png?jsx';
import ImageLinkedInBlack from '~/assets/images/Linkedin-icon-black.png?jsx';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';

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
        <Tooltip text={social.name} key={social.name}>
          <IconButton
            href={social.url}
            class={`${social.class} hover-shadow`}
            ariaLabel={`Link to ${social.name}`}
          >
            <social.iconLight alt={social.alt} q:slot="icon-light" />
            <social.iconDark alt={social.alt} q:slot="icon-dark" />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
});
