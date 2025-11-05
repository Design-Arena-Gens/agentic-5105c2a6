'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDownload = () => {
    if (uploadedImage) {
      const link = document.createElement('a')
      link.href = uploadedImage
      link.download = 'high-quality-photo.png'
      link.click()
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>High Quality Photo Gallery</h1>
        <p className={styles.subtitle}>Upload and view your photos in stunning quality</p>

        {!uploadedImage ? (
          <div
            className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg className={styles.uploadIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className={styles.uploadText}>Drag and drop your photo here</p>
            <p className={styles.uploadSubtext}>or</p>
            <label className={styles.uploadButton}>
              Browse Files
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            <p className={styles.supportedFormats}>Supports: JPG, PNG, GIF, WebP</p>
          </div>
        ) : (
          <div className={styles.photoContainer}>
            <div className={styles.photoWrapper}>
              <img
                src={uploadedImage}
                alt="Uploaded photo"
                className={styles.photo}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.actionButton}
                onClick={handleDownload}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                onClick={() => setUploadedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Upload Another
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
