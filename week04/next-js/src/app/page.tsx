import Image from 'next/image';
import styles from './page.module.css';
import logo from '../../public/nextjs-logo.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Next.js 기초 학습하기</h1>
      {/* 1. lazy loading (자동 적용) */}
      <Image
        src='/nextjs-logo.png'
        alt='Next.js Logo'
        width={300}
        height={200}
      />

      {/* 2. 사이즈 최적화 + 외부 이미지 */}
      <Image
        src='https://cdn.prod.website-files.com/60acbb950c4d66d0ab3e2007/60d8438fd35d5e1eb230ff53_serverless_nextjs_blog_header.png'
        alt='remote image'
        width={600}
        height={300}
      />

      {/* 3. placeholder 적용 + local 이미지*/}
      <Image
        src={logo}
        alt='With Placeholder'
        width={400}
        height={300}
        placeholder='blur'
      />
    </div>
  );
}
