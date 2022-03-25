import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
			<main className={styles.main}>
			<h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
			</main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
