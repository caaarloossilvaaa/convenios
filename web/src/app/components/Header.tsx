import Link from 'next/link'

export function Header() {
  return (
    <div className="flex h-24 w-full bg-slate-800 justify-between items-center p-8">
      <h1 className="text-2xl font-semibold text-gray-100">Droga Nossa</h1>
      <div className="flex flex-row gap-4">
        <Link
          href="/sales/new"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200"
        >
          Nova Venda
        </Link>
        <Link
          href="/sales"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200"
        >
          Listar Vendas
        </Link>
        <Link
          href="/clients"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200"
        >
          Listar Clientes
        </Link>
        <Link
          href="/login"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
