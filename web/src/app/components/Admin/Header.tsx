'use client'

import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useContext } from 'react'

export function Header() {
  const { logout } = useContext(AuthContext)

  function handleLogout() {
    logout()
  }

  return (
    <div className="flex flex-row justify-between h-24 bg-slate-800 text-white text-3xl font-bold items-center p-8">
      <h1>Droga Nossa</h1>
      <div className="flex flex-row gap-4">
        <Link
          href="/admin"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/sales"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Vendas
        </Link>
        <Link
          href="/admin/clients"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Clientes
        </Link>
        <Link
          href="/admin/companies"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Empresas
        </Link>
        <Link
          href="/admin/sellers"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Vendedores
        </Link>
        <Link
          href="/admin/reports"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Relatórios
        </Link>
        <button
          onClick={handleLogout}
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 text-sm font-semibold text-gray-100 rounded-md duration-200 hover:scale-110 md:text-xl"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
