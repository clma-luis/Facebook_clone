import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import Header from '../containers/Header'
import Login from '../containers/Login'
import Sidebar from '../containers/Sidebar'
import Feed from '../containers/Feed'
import Widgets from '../containers/Widgets'
import { collection } from 'firebase/firestore' 
import { orderBy, query } from '@firebase/firestore' 
import { db } from '../../firebase'


export default function Home({ session }) {
  if (!session) return <Login/>
  return (
    <div >
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='flex'>
        {/* sidebar */}
        <Sidebar/>
        {/* feed */}

        <Feed/>
        {/* widgets */}

        <Widgets/>
      </main>
    </div>
  )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {

  const session = await getSession(context);

/*   const posts = await query(collection(db, 'posts'), orderBy('timestamp', 'desc').get()


  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null
  })) */

  return {
    props: {
      session,
     
    },
  }
}