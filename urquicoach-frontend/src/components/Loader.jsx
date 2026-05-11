export default function Loader() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-zinc-900 p-4 text-emerald-300">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
      <p className="text-sm">Generando plan con IA...</p>
    </div>
  )
}
