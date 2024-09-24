import Image from "next/image";

import styles from "./style.module.css";

interface PostCardProps {
  cover?: string;
  title: string;
  description: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({
  cover,
  title,
  description,
  date,
}) => {
  return (
    <div className={styles.card}>
      <div>
        {cover ? (
          <Image width={232} height={168} src={cover} alt="cover" />
        ) : (
          <div className={styles.cover}>
            <div className={styles.text} data-text={title}>
              {title}
            </div>
          </div>
        )}
      </div>
      <div className={styles.meta}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.time}>{date}</div>
      </div>
    </div>
  );
};

export default PostCard;
