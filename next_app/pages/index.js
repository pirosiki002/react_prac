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

  const fetcher = url => fetch(url).then(r => r.json())
  // const { data } = useSWR('/data.json');
  const { data, error } = useSWR('data.json', fetcher)

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className = "alert alert-primary text-center">
          <h5 className="mb-4">
            {data!= undefined ? data.message : 'error...desu....'}
          </h5>
          <table className="table table-dark">
            <thead className="">
              <tr><th>Name</th><th>Mail</th><th>Age</th></tr>
            </thead>
            <tbody>
              {data != undefined ? data.data.map((value, key)=>(
                <tr key={key}>
                  <th>{value.name}</th>
                  <td>{value.mail}</td>
                  <td>{value.age}</td>
                </tr>
              )) : <tr><th></th><td>no data.</td><td></td></tr>}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}
