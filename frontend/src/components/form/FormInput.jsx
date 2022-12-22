import React from 'react'

function FormInput({name,placeholder,label,...rest}) {
  return (
    <div className='flex flex-col-reverse'>
    <input id={name} name={name} className='bg-transparent dark:border-dark-subtle border-light-subtle border-2 rounded dark:focus:border-white focus:border-primary dark:text-white p-1 w-full text-lg outline-none peer transition' placeholder={placeholder} {...rest} />
          <label htmlFor={name} className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start'>{label}</label>
  </div>
  )
}

export default FormInput;
