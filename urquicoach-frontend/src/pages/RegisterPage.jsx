import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error ?? 'Error al registrar')
    }
  }

  return <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4 text-zinc-100"><form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><h1 className="text-2xl font-semibold">Registro</h1><input className="w-full rounded-lg bg-zinc-800 p-3" placeholder="Username" value={form.username} onChange={(e)=>setForm({...form,username:e.target.value})} required /><input className="w-full rounded-lg bg-zinc-800 p-3" type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required /><input className="w-full rounded-lg bg-zinc-800 p-3" type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />{error && <p className="text-sm text-red-400">{error}</p>}<button className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-black">Crear cuenta</button><p className="text-sm text-zinc-400"><Link className="text-emerald-400" to="/login">Volver al login</Link></p></form></div>
}
