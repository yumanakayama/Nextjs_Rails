import { Post } from "@/types/posts";
import Link from "next/link";
import styles from "@/app/styles/home.module.css";
import DeleteButton from "./components/DeleteButton";

const fetchData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
    cache: 'no-store',
  });
  const postsData = await response.json();
  return postsData;
}

export default async function Home() {
  const postsData:Post[] = await fetchData();

  return (
    <main className={styles.homeContainer}>
      <h2> Rails & Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>投稿する</Link>
      <ul>
        {postsData.length > 0 ? (
          postsData.map((item:Post) => (
            <li key={item.id} className={styles.postCard}>
              <Link href={`posts/${item.id}`} className={styles.postCardBox}><h2>{item.title}</h2></Link>
              <p>{item.content}</p>
              <Link href={`/edit-post/${item.id}`} className={`${styles.editDeleteButton} ${styles.editButton}`}>Edit</Link>
              <DeleteButton id={item.id}/>
            </li>
          ))
        ):(
          <li>投稿が見つかりませんでした。</li>
        )}
      </ul>
    </main>
  );
}
