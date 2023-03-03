import { Fragment, SetStateAction, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface IProps {
  values: any[]
  setValue: (value: SetStateAction<string>) => void
  value: string
  htmlFor: string
  label: string
  placeHolder: string
  setCompany: (value: SetStateAction<string>) => void
  setBalance: (value: SetStateAction<string>) => void
  setClient: (value: SetStateAction<string>) => void
  setClientId: (value: SetStateAction<string>) => void
}

export function ComboBoxClient(props: IProps) {
  const [selectedValue, setSelectedValue] = useState('')
  const [query, setQuery] = useState('')

  if (props.values === undefined) {
    return <p>Loading...</p>
  }

  const filteredValue =
    query === ''
      ? props.values
      : props.values.filter((value) => {
          return value.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <label
        htmlFor={props.htmlFor}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {props.label}
      </label>
      <Combobox
        value={selectedValue}
        onChange={(value: any) => {
          setSelectedValue(value)
          props.setCompany(value.company.name)
          const balance = String(value.Balance[0].totalBalance)
          if (balance.indexOf('.') !== -1) {
            props.setBalance(String(balance).replace('.', ','))
          } else {
            props.setBalance(String(balance) + ',00')
          }
          props.setClient(value.name)
          props.setClientId(value.id)
        }}
      >
        <div className="relative mt-1 z-10">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(value: any) => value.name}
              onChange={(event) => {
                setQuery(event.target.value)
                props.setValue(event.target.value)
              }}
              placeholder={props.placeHolder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredValue.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Sem resultados.
                </div>
              ) : (
                filteredValue.map((value) => (
                  <Combobox.Option
                    key={value.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-row justify-between">
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {value.name}
                        </span>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {value.company.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
