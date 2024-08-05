'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from "@/app/styles/home.module.css";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter()
  // 削除
  const handleDelete = async () => {
    if (confirm("削除しますか？")){
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
          method: 'DELETE',
        })
        alert("投稿が削除されました。")
        router.refresh() // ページを更新して変更を反映
      } catch (error) {
        alert("削除に失敗しました。")
      }
    }
  }
  return (
    <button onClick={handleDelete} className={`${styles.editDeleteButton} ${styles.deleteButton}`}>Delete</button>
  )
}

export default DeleteButton