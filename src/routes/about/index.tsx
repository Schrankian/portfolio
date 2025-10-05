import { component$, useComputed$, useSignal } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';
import { SkillProficiency } from '~/components/SkillProficiency';
import { skillDate, skills } from './skills';
import styles from './about.module.css';


export default component$(() => {
  const birthday = new Date("2003-07-15");
  const age = useComputed$(() => {
    const today = new Date();
    let years = today.getFullYear() - birthday.getFullYear();

    // Check if birthday hasn't happened yet this year
    const hasBirthdayPassed =
      today.getMonth() > birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());

    if (!hasBirthdayPassed) {
      years--;
    }

    return years;
  });

  return (
    <div class={styles.container}>
      <h1>About Me</h1>
      <div class={styles.aboutContainer}>
        <div class={styles.left}>
          <p>
            Hey there! I'm Fabian Schuster, a {age.value} year old software developer from Germany. Currently, I'm
            pursuing a dual study program in computer science, combining theoretical knowledge with actual work
            experience in software development. My interest in programming began years ago when building my first
            program for a graphics calculator in school. Since then, my passion for coding only grew stronger,
            leading me to explore various programming languages and technologies. My experience ranges from
            small, elegant solutions to complex, large-scale applications for a variety of different areas.
          </p>
          <p>
            For me, coding became more than just writing lines of code. It is a way to build systems that not only
            work, but also are efficient, maintainable and most importantly, elegant. It is about constantly learning
            from every problem solved and continuously evolving as a developer.
          </p>
          <p>
            Outside of work, I'm probably still tinkering with code or exploring new technologies. I enjoy working
            on personal projects and trying out various open-source projects to broaden my skill set. However I also
            make sure to take breaks and spend time pursuing my other interests, such as mountain biking, working out
            or meeting up with friends. That way I can stay in shape not just mentally but also physically.
          </p>
          <p>
            Thanks for stopping by. If you have any questions or just want to chat, feel free to
            <Link href="/contact"> reach out.</Link>
          </p>
        </div>
        <div class={styles.right}>
          Thats me
        </div>
      </div>
      <div class="divider-horizontal mb-5" />

      <h2>Skills</h2>
      <blockquote>
        <p>
          The following skills are based on my current knowledge and experience as of {skillDate.toLocaleDateString()}.
          There is an algorithm in place that tries to estimate the current proficiency level of each skill based
          on how often I use it. However it's not perfect and may not reflect my actual proficiency accurately.
        </p>
      </blockquote>
      <div class={styles.skillContainer}>
        {
          Object.entries(skills).map(([category, skillSet]) => (
            <div key={category} class={styles.skillCategory}>
              <h3>{category}</h3>
              <div>
                {
                  Object.entries(skillSet).map(([skillName, skillData]) => (
                    <SkillProficiency
                      key={skillName}
                      name={skillName}
                      current_score={skillData.score}
                      current_timestamp={skillDate}
                      frequency={skillData.frequency}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'About',
}