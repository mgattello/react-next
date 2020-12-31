import Head from 'next/head'
import Link from 'next/link'

import utilStyles from '../styles/utils.module.css'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'

import { getSortedPostsData } from '../lib/posts'

/**
 *  “Hey, this page has some data dependencies — so when you 
 *  pre-render this page at build time, make sure to resolve
 *  them first!”. Fetch data before build and then generate 
 *  the page.
 * 
 * Also: getStaticProps only runs on the server-side, so 
 * you can query the database. It will never run on the 
 * client-side.
 * 
 * getStaticProps can only be exported from a page. You 
 * can’t export it from non-page files. Because React needs
 * to have all the required data before the page is rendered.
 * 
 * In @development (npm run dev or yarn dev), getStaticProps 
 * runs on every request. In @production getStaticProps runs 
 * at build time. However, this behavior can be enhanced 
 * using the fallback key returned by getStaticPaths.
 */
export async function getStaticProps () {
  const allPostsData = getSortedPostsData ()

  return {
    props: {
      allPostsData
    }
  }

   /** or with an API */

  // const res = await fetch('..')
  // return res.json()
  
  /*
   * Note: Next.js polyfills fetch() on both the client and server. 
   * You don't need to import it.
   */
}

/** If you need to fetch data at request time then you use SSR. */

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }

/**
 * If you do not need to pre-render the data, you can use 
 * Client-side Rendering. works well for user dashboard 
 * pages, for example. Because a dashboard is a private, 
 * user-specific page, SEO is not relevant, and the page 
 * doesn’t need to be pre-rendered. The data is frequently 
 * updated, which requires request-time data fetching.
 */

// import useSWR from 'swr'

// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey, I'm Marco. I'm a Software Engineer and an until-midnight developer.</p>
        <p>
          And this is a demo on how to use NEXT.js, a React Framework.
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
