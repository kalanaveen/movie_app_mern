import React from 'react'

function FormInput({name,placeholder,label,...rest}) {
  return (
    <div className='flex flex-col-reverse'>
    <input id={name} name={name} className='bg-transparent border-dark-subtle border-2 rounded focus:border-white text-white p-1 w-full text-lg outline-none peer transition' placeholder={placeholder} {...rest} />
          <label htmlFor={name} className='font-semibold text-dark-subtle peer-focus:text-white transition self-start'>{label}</label>
  </div>
  )
}

export default FormInput;
