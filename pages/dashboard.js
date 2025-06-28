import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace('/login')
      else setUser(user)
    })
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => {
        supabase.auth.signOut()
        router.push('/login')
      }}>Logout</button>
    </div>
  )
}
