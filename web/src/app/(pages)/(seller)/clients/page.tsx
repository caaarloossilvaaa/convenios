'use client'
import { EyeIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import env from '@/../environment'

interface IDetailClient {
  name: string
  cpf: string
  company: string
  cell: string
  newTotalBalance: string
  newBalance: string
}

export default function Client() {
  const [loading, setLoading] = useState(false)
  const [dataClients, setDataClients] = useState<any[]>()
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [company, setCompany] = useState('')
  const [cell, setCell] = useState('')
  const [totalBalance, setTotalBalance] = useState(0)
  const [balance, setBalance] = useState(0)
  const [viewDetail, setViewDetail] = useState(false)

  useEffect(() => {
    setLoading(true)
    const saleData = async () => {
      console.log(env.API_URL)
      const res = await fetch(`${env.API_URL}/clients`)
      const data = await res.json()
      setDataClients(data.clients)
      setLoading(false)
    }
    saleData()
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])
  if (loading) {
    return <p>Loading...</p>
  }

  function handleViewSale({
    name,
    cpf,
    company,
    cell,
    newTotalBalance,
    newBalance,
  }: IDetailClient) {
    setName(name)
    setCpf(cpf)
    setCompany(company)
    setCell(cell)
    setTotalBalance(Number(newTotalBalance))
    setBalance(Number(newBalance))
    setViewDetail(!viewDetail)
  }

  return (
    <>
      <div
        className={
          viewDetail
            ? 'flex absolute top-1/2 left-1/2 w-1/3 bg-gray-100 flex-col z-10 p-8 backdrop-brightness-75 rounded-xl -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_67px_10px_#00000024] border border-gray-800 border-spacing-2'
            : 'hidden'
        }
      >
        <h1 className="text-2xl font-semibold">Visualizar Cliente</h1>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">Nome: </span>
          {name}
        </span>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">CPF: </span>
          {cpf}
        </span>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">Empresa: </span>
          {company}
        </span>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">Celular: </span>
          {cell}
        </span>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">Crédito: </span> R${' '}
          {Number(totalBalance).toFixed(2).replace('.', ',')}
        </span>
        <span className="text-xl font-light mt-4">
          <span className="font-bold">Saldo Atual: </span>R${' '}
          {Number(balance).toFixed(2).replace('.', ',')}
        </span>

        <div className="mt-4 flex w-full justify-between gap-4">
          <button
            onClick={() => setViewDetail(false)}
            className="bg-red-700 p-2 w-full text-white text-xl font-semibold rounded-lg hover:bg-red-900 duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full p-16 relative overflow-x-auto">
        <h1 className="text-2xl font-semibold text-slate-500">Clientes</h1>
        <table className="w-full text-sm text-left table-auto mt-8">
          <thead className=" text-base text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/5">
                ID
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Nome
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Empresa
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Celular
              </th>
              <th scope="col" className="px-6 py-3 w-1/5 text-center">
                Visualizar
              </th>
            </tr>
          </thead>
          <tbody>
            {dataClients?.map((client) => {
              const name = client.name
              const cpf = String(client.cpf)
              const cpfFormatted =
                cpf.substring(0, 3) +
                '.' +
                cpf.substring(3, 6) +
                '.' +
                cpf.substring(6, 9) +
                '-' +
                cpf.substring(9, 11)
              const company = client.company.name
              const cell = String(client.cell)
              const cellFormated =
                '(' +
                cell.substring(0, 2) +
                ') ' +
                cell.substring(2, 7) +
                ' ' +
                cell.substring(7, 11)
              const newTotalBalance = client.Balance[0].totalBalance
              const newBalance = client.Balance[0].balance
              return (
                <tr className="bg-white border-b " key={client.id}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {String(client.id).trim()}
                  </td>
                  <td className="px-6 py-4">{client.name}</td>
                  <td className="px-6 py-4">{client.company.name}</td>
                  <td className="px-6 py-4">{cellFormated}</td>
                  <td className="px-6 py-4 flex flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() =>
                        handleViewSale({
                          name,
                          cpf: cpfFormatted,
                          company,
                          cell: cellFormated,
                          newTotalBalance,
                          newBalance,
                        })
                      }
                      className="w-5 h-5 hover:scale-125 duration-200 text-gray-800 hover:text-gray-700"
                    >
                      <EyeIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
