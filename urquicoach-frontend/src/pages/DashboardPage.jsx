import { useState } from 'react'
import { Dumbbell, LogOut } from 'lucide-react'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [form, setForm] = useState({ 
    age: '', 
    gender: 'masculino', 
    weight: '', 
    height: '', 
    goal: 'volumen', 
    days_available: '' 
  })

  const generate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { 
        ...form, 
        user_id: user.id, 
        age: Number(form.age), 
        weight: Number(form.weight), 
        height: Number(form.height), 
        days_available: Number(form.days_available) 
      }
      const { data } = await api.post('/plan/generate', payload)
      setPlan(data) // Aquí guardamos el JSON que manda la IA
    } catch (error) {
      console.error("Error al generar:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* ENCABEZADO */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Bienvenido, {user?.username}</p>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 transition-colors hover:bg-zinc-800">
            <LogOut size={16}/>Salir
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* FORMULARIO */}
          <form onSubmit={generate} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-400">Generar Nuevo Plan</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <input type="number" required className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Edad" value={form.age} onChange={(e)=>setForm({...form, age: e.target.value})} />
              <input type="number" required className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Peso (kg)" value={form.weight} onChange={(e)=>setForm({...form, weight: e.target.value})} />
              <input type="number" required className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Altura (cm)" value={form.height} onChange={(e)=>setForm({...form, height: e.target.value})} />
              <input type="number" required className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Días x sem" value={form.days_available} onChange={(e)=>setForm({...form, days_available: e.target.value})} />
            </div>

            <select className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" value={form.gender} onChange={(e)=>setForm({...form, gender: e.target.value})}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>

            <select className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-emerald-400" value={form.goal} onChange={(e)=>setForm({...form, goal: e.target.value})}>
              <option value="volumen">Ganar músculo</option>
              <option value="definicion">Perder grasa</option>
              <option value="mantenimiento">Mantener</option>
            </select>

            <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 p-3 font-semibold text-black transition-colors hover:bg-emerald-400 disabled:opacity-50">
              <Dumbbell size={18}/>
              {loading ? 'Procesando con IA...' : 'Generar con IA'}
            </button>
            
            {/* Muestra el loader mientras la IA piensa */}
            {loading && <div className="mt-4 flex justify-center"><Loader /></div>}
          </form>

          {/* SECCIÓN DIETA */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-orange-400">Plan de Alimentación</h2>
            {plan?.dieta ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-zinc-950 p-4 border border-zinc-800">
                  <span className="text-zinc-400">Calorías Diarias:</span>
                  <span className="text-2xl font-bold text-emerald-400">{plan.dieta.calorias_diarias} kcal</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-zinc-950 p-3 text-center border border-zinc-800">
                    <p className="text-xs text-zinc-400">Proteína</p>
                    <p className="font-semibold text-white">{plan.dieta.distribucion_macros.proteina}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-950 p-3 text-center border border-zinc-800">
                    <p className="text-xs text-zinc-400">Carbos</p>
                    <p className="font-semibold text-white">{plan.dieta.distribucion_macros.carbos}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-950 p-3 text-center border border-zinc-800">
                    <p className="text-xs text-zinc-400">Grasas</p>
                    <p className="font-semibold text-white">{plan.dieta.distribucion_macros.grasas}</p>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800">
                  <p className="mb-2 text-sm font-semibold text-orange-400">Ejemplo de Comidas:</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{plan.dieta.ejemplo_comida}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-700">
                <p className="text-sm text-zinc-500">Genera un plan para ver tus macros</p>
              </div>
            )}
          </div>
        </div>

        {/* SECCIÓN RUTINA */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-emerald-400">Rutina Semanal</h2>
          {plan?.rutina ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {plan.rutina.map((item, index) => (
                <article key={index} className="flex flex-col rounded-xl border border-zinc-700 bg-zinc-950 p-4 transition-transform hover:-translate-y-1">
                  <h3 className="mb-3 border-b border-zinc-800 pb-2 font-bold capitalize text-orange-400">{item.dia}</h3>
                  <ul className="flex-1 space-y-2 text-sm text-zinc-300">
                    {item.ejercicios.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
             <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-zinc-700">
               <p className="text-sm text-zinc-500">La rutina aparecerá aquí</p>
             </div>
          )}
        </section>

      </div>
    </div>
  )
}