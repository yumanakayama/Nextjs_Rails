import { Post } from '@/types/posts';
import React from 'react'
import styles from '@/app/styles/post.module.css'
import Link from 'next/link';

const fetchData = async (id:string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    cache: 'no-store',
  });
  const postData = await response.json();
  return postData;
}

const Page = async({params}:{params:Post}) => {
  const postData:Post = await fetchData(params.id);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{postData.title}</h1>
      <p className={styles.date}>{postData.created_at}</p>
      <p className={styles.content}>{postData.content}</p>
      <Link href="/">戻る</Link>
    </div>
  )
}

export default Page