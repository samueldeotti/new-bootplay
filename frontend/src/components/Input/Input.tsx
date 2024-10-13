import React, { useState } from 'react';
import './input.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
  verifyValue: (value: string) => boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  [key: string]: unknown;
}

export default function Input({
  children,
  verifyValue,
  isPassword = false,
  errorMessage,
  ...props
}: Props) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValueValid, setIsValueValid] = useState(true);

  const setBorderColor = () => 
    isFirstRender || isValueValid ? 'ring-ringColor' : 'ring-ringRedColor focus:outline-red-500';

  return (
    <label className="text-sm font-normal relative mb-2 w-full">
      <span className="text-sm font-medium text-labelInput md:text-sm lg:text-base">
        {children}
      </span>

      <div className="flex items-center justify-center mb-5 mt-1">
        <input
          {...props}
          onChange={(e) => {
            props.onChange(e);
            setIsFirstRender(false);
            setIsValueValid(verifyValue(e.target.value));
          }}
          type={isPassword && !isPasswordVisible ? 'password' : 'text'}
          className={`bg-zinc-50 w-full p-3 rounded-xl ring-1 pr-12 relative ${setBorderColor()} outline-1 md:text-base disabled:bg-zinc-200 disabled:cursor-not-allowed`}
        />

        {isPassword && (
          <div
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 cursor-pointer"
            data-testid="eye-icon"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        )}
      </div>

      {!isFirstRender && !isValueValid && (
        <span className="absolute bottom-0 left-0 ml-2 text-xs sm:text-sm sm:bottom-[-2px] text-ringRedColor">
          {errorMessage || 'Valor inválido'}
        </span>
      )}
    </label>
  );
}
