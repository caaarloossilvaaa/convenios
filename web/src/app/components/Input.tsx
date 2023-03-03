import { SetStateAction } from 'react'
import { NumericFormat } from 'react-number-format'

interface IProps {
  setValue: (value: SetStateAction<string>) => void
  value: string
  type: string
  id: string
  placeholder: string
  label: string
  htmlFor: string
  readOnly: boolean
}

export function Input(props: IProps) {
  if (props.type === 'mask') {
    return (
      <div className="relative mb-6" data-te-input-wrapper-init>
        <label
          htmlFor={props.htmlFor}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {props.label}
        </label>
        <NumericFormat
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={props.id}
          placeholder={props.value}
          prefix={'R$ '}
          decimalScale={2}
          decimalSeparator={','}
          allowLeadingZeros
          thousandSeparator="."
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          readOnly={props.readOnly}
        />
      </div>
    )
  }

  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <label
        htmlFor={props.htmlFor}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={props.id}
        aria-describedby="seller"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        readOnly={props.readOnly}
      />
    </div>
  )
}
