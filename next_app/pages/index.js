// import useSWR from 'swr'

// //fetcher関数の作成
// const fetcher = url => fetch(url).then(r => r.json())

// export default function index () {
//   // const { data, error } = useSWR('/api/user', fetcher)
//   const { data, error } = useSWR('data.json', fetcher)
//   //エラー
//   if (error) return <div>failed to load</div>
//   //ロード中
//   if (!data) return <div>loading...</div>
//   //成功
//   return <pre>{JSON.stringify(data, null, 2)}</pre>
// }


import Layout from '../components/layout';
import useSWR from 'swr';

export default function Home() {

  // const fetcher = url => fetch(url).then(r => r.json())
  // const { data, error } = useSWR('data.json', fetcher)
  const func = (...args)=> fetch(...args).then(res => res.text());
  const {data, err} = useSWR('/data.txt', func);

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className = "mb-4">
            {data}
          </h5>
        </div>
      </Layout>
    </div>
  )

}
