'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from "@/app/styles/home.module.css";

const EditPost = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, {
        cache: 'no-store',
      });
      const postData = await response.json();
      setTitle(postData.title)
      setContent(postData.content)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content
        }),
      });
      if(response) {
        router.push("/")
      }
    } catch (error) {
      alert("編集に失敗しました。")
    }
  }

  return (
    <div className={styles.container}>
      <h2>編集</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title" className={styles.label}>タイトル</label>
        <input type="text" name="title" id="title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value)} className={styles.input}/>
        <label htmlFor="content" className={styles.label}>本文</label>
        <textarea name="content" id="content" value={content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> setContent(e.target.value)} className={styles.textarea}/>
        <button type='submit' className={styles.button}>更新</button>
      </form>
    </div>
  )
}

export default EditPost