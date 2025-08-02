import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { SocialLinks } from '~/components/SocialLinks';

const Form = component$(() => {
  return (
    <form action="https://formsubmit.co/contact@fabianschuster.net" method="POST">
      <input type="hidden" name="_subject" value="New submission!" />
      <input type="hidden" name="_template" value="box" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://www.fabianschuster.net/contact" />
      <label>Name</label>
      <input type="text" name="name" placeholder="Enter your Name" required />
      <label>Email</label>
      <input type="email" name="email" placeholder="Enter your Email Adress" required />
      <label>Message</label>
      <textarea name="message" placeholder="Enter your Message" style={{ minHeight: '100px' }}></textarea>
      <button type="submit">Send</button>
    </form>
  )
});

export default component$(() => {
  return (
    <div class="w-content">
      <h1>Contact</h1>
      <p>
        If you have any questions, suggestions, or just want to say hello, feel free to reach out! <br/>
        Simply write me an email to <a href='mailto:contact@fabianschuster.net'>contact@fabianschuster.net</a> or use the form below.
      </p>
      <SocialLinks />
      <br/>
      <Form />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Contact',
}