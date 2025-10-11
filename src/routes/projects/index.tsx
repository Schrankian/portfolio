import { component$, Slot } from '@builder.io/qwik';
import styles from './projects.module.css';
import { Link } from '@builder.io/qwik-city';
import Connect4Image from '~/assets/images/projects/connect4.jpeg?jsx';
import PortfolioImage from '~/assets/images/projects/portfolio.png?jsx';
import CampusDualAppImage from '~/assets/images/projects/campus_dual_app.jpg?jsx';
import LearnMLImage from '~/assets/images/projects/learn-ml.png?jsx';
import { getMenu } from '~/utils/parse_menu';

interface ProjectCardProps {
  title: string;
  internalLink?: string;
  externalLink?: string;
}

const ProjectCard = component$<ProjectCardProps>(({ title, internalLink, externalLink }) => {
  return (
    <div class={styles.projectRow}>
      <div class={styles.projectImage}>
        <Slot name='image' />
      </div>
      <div class={styles.projectCard}>
        <h2>{title}</h2>
        <p>
          <Slot />
        </p>
        <div class="row gap-5">
          {internalLink && <Link href={internalLink}>{$localize`View write-up`}</Link>}
          {externalLink && <a href={externalLink} target="_blank">{$localize`View source`}</a>}
        </div>
      </div>
    </div>
  );
});

export default component$(() => {
  const writeUpList = getMenu().projects?.items;
  const getInternalLink = (title: string) => {
    const el = writeUpList?.find(item => item.title === title);
    return el ? `/${el.link}` : undefined;
  };

  return (
    <div class={styles.container}>
      <h1>{$localize`My Projects`}</h1>
      <p>
        {$localize`Below are a few personal projects I've developed in my free time, outside of professional or academic work`}
      </p>
      <div class="divider-horizontal mb-5" />

      <ProjectCard title="Campus Dual App" internalLink={getInternalLink("Campus Dual App")} externalLink="https://github.com/schrankian/campus-dual-app">
        {$localize`
          The management portal of my university was not very nice to work with and had no mobile app.
          So I decided to code my own, which uses a combination of publicly available api endpoints
          and scraping the rendered html documents to get all the data I want and display them in an
          elegant fashion. I also added some qol features like credential caching and offline viewing.
          This app doesn't require any external server (beside the university-server) to work as it saves
          all data locally.
        `}
        <CampusDualAppImage q:slot='image' alt="Campus Dual App Screenshot" class={styles.vertical} />
      </ProjectCard>

      {/* <ProjectCard title="Wordle Clone" internalLink="/projects/wordle-clone">
        This is my first mobile project which I finished. Even though this was my first finished
        Project with Flutter, I already used Flutter in other unfinished Projects, so I had a little
        bit of experience which helped me a lot while coding it.
      </ProjectCard> */}

      <ProjectCard title="Portfolio Website" internalLink={getInternalLink("Portfolio Website")} externalLink="https://github.com/schrankian/portfolio">
        {$localize`
          This is the website you are currently looking at. It showcases my projects and skills as a developer.
          The website is built using Qwik, a modern framework for building fast and efficient web applications.
        `}
        <PortfolioImage q:slot='image' alt="Portfolio Website Screenshot" />
      </ProjectCard>

      <ProjectCard title="Connect Four for Calculator" internalLink={getInternalLink("Connect Four for Calculator")} externalLink="https://github.com/schrankian/connect-four">
        {$localize`
          This is my first ever project which is worth mentioning. It was quite a struggle to code something
          on a calculator, especially if there are nearly no tutorials. But somehow I got it working.
          I didn't want to use the programming language inside the Calculator, because it's really simple and full of bugs.
          That's why I decided to use the advanced Casio SDK for my project (which wasn't easy to find and understand).
          Another unfortunate thing was, that I had to code it in C, which I never used before, so I had to learn it.
          As this was my first project, the code isn't very organized but it worked which is pretty awesome.
        `}
        <Connect4Image q:slot='image' alt="Connect Four on Casio Calculator" />
      </ProjectCard>

      <ProjectCard title="Neural Network in Rust" internalLink={getInternalLink("Neural Network in Rust")} externalLink="https://github.com/schrankian/learn-ml">
        {$localize`
          This project is a very simple and naive implementation of a neural network in Rust. It was a fun
          way to learn about the basics of neural networks and how they work. The implementation is not optimized
          and is meant for educational purposes only. But for anyone who wants to understand the basics of neural
          networks and knows Rust, this is a good starting point. It includes all functionality needed to train
          a neural network based on the MNIST dataset for handwritten digit recognition.
        `}
        <LearnMLImage q:slot='image' alt="Learn ML with Rust Screenshot" class={styles.vertical} />
      </ProjectCard>
    </div>
  );
});

export const head = {
  title: 'Projects',
  meta: [
    {
      name: 'description',
      content: 'A collection of my personal projects showcasing my skills and interests in software development.'
    }
  ]
};