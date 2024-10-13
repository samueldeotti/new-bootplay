import { X } from 'lucide-react'
import React from 'react'

export default function Modal({ children, isOpen, setIsOpen }: {
  children: React.ReactNode,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (

    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col sm:flex-row sm:w-3/4 sm:h-3/4 max-w-[70%] sm:max-w-[600px] sm:max-h-[320px] max-h-fit bg-white">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#F4F4F4] text-white z-10 p-1 rounded-[50%] absolute right-2 top-2"
            >
              <X className="text-[#444257] size-5" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>

  )
}
