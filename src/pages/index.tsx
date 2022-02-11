import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import Header from '../containers/Header'
import Login from '../containers/Login'
import Sidebar from '../containers/Sidebar'
import Feed from '../containers/Feed'

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
      </main>
    </div>
  )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {

  const session = await getSession(context);

  return {
    props: {
      session,
    },
  }
}