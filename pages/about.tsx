import type { NextPage } from "next";
import styles from "../styles/about.module.css";
import { AboutData } from "./api/about";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/about");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const About: NextPage<{ data: AboutData }> = ({ data }) => {
  return (
    <div>
      <div>
        <img src={data.cover} alt="cover" />
      </div>
      <div>
        <img src={data.avatar} alt="avatar" />
        <h4>{data.name}</h4>
        <p>{data.introduce}</p>
        {data.icons.map((icon) => (
          <a
            key={icon.name}
            href={icon.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={icon.cover} alt={icon.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default About;
