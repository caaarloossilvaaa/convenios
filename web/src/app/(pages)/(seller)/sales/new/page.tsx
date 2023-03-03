'use client'

import { ComboBox } from '@/app/components/ComboBox'
import { ComboBoxClient } from '@/app/components/ComboBoxClient'
import { Input } from '@/app/components/Input'
import { FormEvent, useEffect, useState } from 'react'

interface IProps {
  clientId: string
  sellerId: string
  value: number
}

async function postData({ clientId, sellerId, value }: IProps) {
  const data = {
    clientId,
    sellerId,
    value,
  }
  const response = await fetch('http://localhost:3333/api/sales', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export default function Sale() {
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [sellerId, setSellerId] = useState('')
  const [sellers, setSellers] = useState<any>()
  const [clients, setClients] = useState<any>()
  const [seller, setSeller] = useState('')
  const [client, setClient] = useState('')
  const [company, setCompany] = useState('')
  const [actualBalance, setActualBalance] = useState('')
  const [saleValue, setSaleValue] = useState('')

  useEffect(() => {
    setLoading(true)
    const clientData = async () => {
      const data = await (
        await fetch('http://localhost:3333/api/clients')
      ).json()
      setClients(data.clients)
      setLoading(false)
    }
    const sellerData = async () => {
      const data = await (
        await fetch('http://localhost:3333/api/sellers')
      ).json()
      setSellers(data.sellers)
      setLoading(false)
    }

    sellerData()
    clientData()
  }, [])

  function submit(e: FormEvent) {
    e.preventDefault()
    const newValue = saleValue.replace('R$ ', '').replace(',', '.')
    const value = Number(newValue)
    postData({ clientId, sellerId, value }).then((data) => {
      if (data.message) {
        return alert('Saldo insuficiente!')
      }
      alert(`
      Venda Realizada com sucesso!
      Cliente: ${data.sale.client.name}
      Saldo atual: R$ ${data.balance.balance}
      `)
      return window.location.reload()
    })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="flex flex-col h-full relative overflow-x-auto p-16">
        <h1 className="text-2xl font-semibold text-slate-500">Nova venda</h1>
        <div className="flex justify-center items-center h-full">
          <div className="block rounded-lg mt-8 bg-white p-6 shadow-lg max-w-xl mx-auto w-full">
            <form onSubmit={(e) => submit(e)}>
              <div className="grid grid-cols-1 gap-4 w-full">
                <ComboBox
                  htmlFor="sellers"
                  label="Vendedor"
                  values={sellers}
                  placeHolder="Vendedor"
                  setValue={setSeller}
                  value={seller}
                  setSeller={setSeller}
                  setSellerId={setSellerId}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 w-full">
                <ComboBoxClient
                  htmlFor="client"
                  label="Cliente"
                  values={clients}
                  placeHolder="Cliente"
                  setValue={setClient}
                  value={client}
                  setCompany={setCompany}
                  setBalance={setActualBalance}
                  setClient={setClient}
                  setClientId={setClientId}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 w-full">
                <Input
                  type="text"
                  label="Empresa"
                  htmlFor="company"
                  id="company"
                  placeholder="Empresa"
                  value={company}
                  setValue={setCompany}
                  readOnly={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Input
                  type="mask"
                  id="actualBalance"
                  placeholder="Saldo Atual"
                  value={actualBalance}
                  setValue={setActualBalance}
                  label="Saldo Atual"
                  htmlFor="actualBalance"
                  readOnly={true}
                />
                <Input
                  type="mask"
                  id="saleValue"
                  placeholder="Valor da Venda"
                  value={saleValue}
                  setValue={setSaleValue}
                  label="Valor da Venda"
                  htmlFor="saleValue"
                  readOnly={false}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-200">
                    Confirmar
                  </button>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <button className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-200">
                    Cancelar uma venda
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
