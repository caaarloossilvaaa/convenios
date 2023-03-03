'use client'

import { EyeIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

interface IDetailSale {
  client: string
  seller: string
  company: string
  valueSale: string
  saleId: string
}

export default function Sale() {
  const [loading, setLoading] = useState(false)
  const [dataSale, setDataSale] = useState<any[]>()
  const [client, setClient] = useState('')
  const [seller, setSeller] = useState('')
  const [company, setCompany] = useState('')
  const [value, setValue] = useState(0)
  const [viewDetail, setViewDetail] = useState(false)
  const [selectedSaleId, setSelectedSaleId] = useState('')

  useEffect(() => {
    setLoading(true)
    const saleData = async () => {
      const res = await fetch('http://localhost:3333/api/sales')
      const data = await res.json()
      setDataSale(data.sales)
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
    seller,
    client,
    company,
    valueSale,
    saleId,
  }: IDetailSale) {
    setClient(client)
    setSeller(seller)
    setCompany(company)
    setValue(Number(valueSale))
    setViewDetail(!viewDetail)
    setSelectedSaleId(saleId)
  }

  async function handleCancelSale() {
    fetch('http://localhost:3333/api/sales/' + selectedSaleId, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        alert('Venda excluída com sucesso!')
        setClient('')
        setSeller('')
        setCompany('')
        setValue(0)
        setViewDetail(false)
        setSelectedSaleId('')
        console.log(data)
        window.location.reload()
      })
  }

  return (
    <>
      <div className="flex flex-col h-full p-16 relative overflow-x-auto">
        <h1 className="text-2xl font-semibold text-slate-500">Vendas</h1>
        <table className="w-full text-sm text-left table-auto mt-8">
          <thead className=" text-base text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/5">
                ID
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Vendedor
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Valor
              </th>
              <th scope="col" className="px-6 py-3 w-1/5 text-center">
                Visualizar
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSale?.map((sale) => {
              const newValue = sale.value
              const value = parseFloat(newValue).toFixed(2).replace('.', ',')
              const seller = sale.seller.name
              const client = sale.client.name
              const company = sale.client.company.name
              const saleId = sale.id

              return (
                <tr className="bg-white border-b " key={sale.id}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {String(sale.id).trim()}
                  </td>
                  <td className="px-6 py-4">{sale.client.name}</td>
                  <td className="px-6 py-4">{sale.seller.name}</td>
                  <td className="px-6 py-4">R$ {value}</td>
                  <td className="px-6 py-4 flex flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() =>
                        handleViewSale({
                          seller,
                          client,
                          company,
                          valueSale: newValue,
                          saleId,
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
      <div
        className={
          viewDetail
            ? 'flex absolute top-1/2 left-1/2 w-1/3 bg-gray-100 flex-col z-10 p-8 backdrop-brightness-75 rounded-xl -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_67px_10px_#00000024] border border-gray-800 border-spacing-2'
            : 'hidden'
        }
      >
        <h1 className="text-2xl font-semibold">Visualizar Venda</h1>
        <span className="text-xl font-light mt-4">Cliente: {client}</span>
        <span className="text-xl font-light mt-4">Vendedor: {seller}</span>
        <span className="text-xl font-light mt-4">Empresa: {company}</span>
        <span className="text-xl font-light mt-4">
          Valor da Venda: R$ {Number(value).toFixed(2).replace('.', ',')}
        </span>
        <div className="mt-4 flex w-full justify-between gap-4">
          <button
            onClick={() => handleCancelSale()}
            className="bg-orange-500 p-2 w-1/2 text-white text-xl font-semibold rounded-lg hover:bg-orange-700 duration-200"
          >
            Cancelar Venda
          </button>
          <button
            onClick={() => setViewDetail(false)}
            className="bg-red-700 p-2 w-1/2 text-white text-xl font-semibold rounded-lg hover:bg-red-900 duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  )
}
