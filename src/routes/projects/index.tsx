import { component$ } from '@builder.io/qwik';
import styles from './projects.module.css';

export default component$(() => {
  return (
    <div class="col w-content">
      <h1>My Projects</h1>
      <p>
        Below are a few personal projects I've developed in my free time, outside of professional or academic work:
      </p>
      <div>
        <h2>Campus Dual App</h2>
        <p>
          The management portal of my university was not very nice to work with and had no mobile app. 
          So I decided to code my own, which uses a combination of publicly available api endpoints
          and scraping the rendered html documents to get all the data I want and display them in an
          elegant fashion. I also added some qol features like credential caching and offline viewing.
          This app doesn't require any external server (beside the university-server) to work as it saves
          all data locally. 
        </p>
      </div>
      <div>
        <h2>Wordle Clone</h2>
        <p>
          This is my first mobile project which I finished. Even though this was my first finished 
          Project with Flutter, I already used Flutter in other unfinished Projects, so I had a little 
          bit of experience which helped me a lot while coding it. 
        </p>
      </div>
      <div>
        <h2>Portfolio Website</h2>
        <p>
          This is the website you are currently looking at. It showcases my projects and skills as a developer.
          The website is built using Qwik, a modern framework for building fast and efficient web applications.
        </p>
      </div>
      <div>
        <h2>Connect four for Calculator</h2>
        <p>
          This is my first ever project which is worth mentioning. It was quite a struggle to code something 
          on a calculator, espacialy if there are nearly no tutorials. But somehow I got it working. I didn't 
          want to use the programming language inside the Calculator, because it's really simple and full of 
          bugs. That's why I decided to use the advanced Casio SDK for my project (which wasn't easy to find 
          and understand). Another unfortunate thing was, that I had to Code it in C, which I never used before, 
          so I had to learn it. As this was my first project, the code isn't very organized but it worked which 
          is pretty awesome. 
        </p>
      </div>
      <div>
        <h2>Neural Network in Rust</h2>
        <p>
          This project is a very simple and naive implementation of a neural network in Rust. It was a fun
          way to learn about the basics of neural networks and how they work. The implementation is not optimized
          and is meant for educational purposes only. But for anyone who wants to understand the basics of neural 
          networks and knows Rust, this is a good starting point. It includes all functionality needed to train
          a neuronal network based on the MNIST dataset for handwritten digit recognition.
        </p>
      </div>
    </div>
  );
});
