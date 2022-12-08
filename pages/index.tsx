import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rizq AI powered by OpenAI</title>
      </Head>
      <section
        className={
          styles.home +
          " min-h-screen bg-no-repeat bg-cover flex items-center text-white"
        }
      >
        <div className="mx-24 max-w-3xl">
          <h1 className="text-6xl">
            Introducing the AI Text and Image Generator
          </h1>
          <p className="text-xs mt-5">
            {" "}
            the future of content creation! With our state-of-the-art
            technology, you can easily generate unique, engaging, and
            high-quality text and images in just a few clicks. Whether youre a
            blogger, marketer, or business owner, our AI-powered tools can help
            you create content that stands out and drives results. Try it out
            today and see the power of AI at work
          </p>
        </div>
      </section>
    </>
  );
}
