import Link from 'next/link'

export function Header() {
  return (
    <div className="flex flex-row justify-between h-24 bg-slate-800 text-white text-3xl font-bold items-center p-8">
      <h1>Droga Nossa</h1>
      <div className="flex flex-row gap-4">
        <Link
          href="/admin"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/sales"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Vendas
        </Link>
        <Link
          href="/admin/clients"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Clientes
        </Link>
        <Link
          href="/admin/companies"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Empresas
        </Link>
        <Link
          href="/admin/sellers"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Vendedores
        </Link>
        <Link
          href="/admin/reports"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-xl font-semibold text-gray-100 rounded-md duration-200 hover:scale-110"
        >
          Relatórios
        </Link>
      </div>
    </div>
  )
}
