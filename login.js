import { useState } from 'react'
import supabase from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/dashboard')
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br/>
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  )
}
