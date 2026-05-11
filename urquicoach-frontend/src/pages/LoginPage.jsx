import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login({ token: data.token, user: data.user })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error ?? 'Credenciales inválidas')
    }
  }

  return <AuthShell title="Inicia sesión" onSubmit={onSubmit} email={email} password={password} setEmail={setEmail} setPassword={setPassword} error={error} link={<Link className="text-orange-400" to="/register">Crear cuenta</Link>} />
}

function AuthShell({ title, onSubmit, email, password, setEmail, setPassword, error, link }) {
  return <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4 text-zinc-100"><form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><h1 className="text-2xl font-semibold">{title}</h1><input className="w-full rounded-lg bg-zinc-800 p-3" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required /><input className="w-full rounded-lg bg-zinc-800 p-3" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />{error && <p className="text-sm text-red-400">{error}</p>}<button className="w-full rounded-lg bg-emerald-400 py-3 font-semibold text-black">Entrar</button><p className="text-sm text-zinc-400">{link}</p></form></div>
}
