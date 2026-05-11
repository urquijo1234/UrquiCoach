import { useState } from 'react'
import { Dumbbell, LogOut } from 'lucide-react'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [form, setForm] = useState({ age: '', gender: 'male', weight: '', height: '', goal: 'muscle_gain', days_available: '' })

  const generate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, user_id: user.id, age: Number(form.age), weight: Number(form.weight), height: Number(form.height), days_available: Number(form.days_available) }
      const { data } = await api.post('/plan/generate', payload)
      setPlan(data)
    } finally {
      setLoading(false)
    }
  }

  return <div className="min-h-screen bg-[#121212] p-4 text-zinc-100 md:p-8"><div className="mx-auto max-w-6xl space-y-6"><header className="flex items-center justify-between"><div><p className="text-sm text-zinc-400">Bienvenido, {user?.username}</p><h1 className="text-3xl font-bold">Dashboard</h1></div><button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2"><LogOut size={16}/>Salir</button></header><div className="grid gap-6 lg:grid-cols-2"><form onSubmit={generate} className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-xl font-semibold text-emerald-400">Generar Nuevo Plan</h2>{['age','weight','height','days_available'].map((key)=><input key={key} type="number" required className="w-full rounded-lg bg-zinc-800 p-3" placeholder={key} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} />)}<select className="w-full rounded-lg bg-zinc-800 p-3" value={form.gender} onChange={(e)=>setForm({...form,gender:e.target.value})}><option value="male">Masculino</option><option value="female">Femenino</option></select><select className="w-full rounded-lg bg-zinc-800 p-3" value={form.goal} onChange={(e)=>setForm({...form,goal:e.target.value})}><option value="muscle_gain">Ganar músculo</option><option value="fat_loss">Perder grasa</option><option value="maintenance">Mantener</option></select><button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 p-3 font-semibold text-black"><Dumbbell size={18}/>Generar con IA</button>{loading && <Loader />}</form><div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="mb-3 text-xl font-semibold text-orange-400">Dieta</h2>{plan?.diet ? <pre className="overflow-auto rounded-lg bg-zinc-950 p-3 text-xs">{JSON.stringify(plan.diet, null, 2)}</pre> : <p className="text-zinc-400">Genera un plan para visualizar tu dieta y macros.</p>}</div></div><section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="mb-3 text-xl font-semibold text-emerald-400">Rutina</h2>{plan?.workout ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Object.entries(plan.workout).map(([day, exercises])=><article key={day} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4"><h3 className="font-semibold capitalize">{day}</h3><ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">{(Array.isArray(exercises) ? exercises : [exercises]).map((ex, i)=><li key={i}>{typeof ex === 'string' ? ex : JSON.stringify(ex)}</li>)}</ul></article>)}</div> : <p className="text-zinc-400">Aún no hay rutina.</p>}</section></div></div>
}
