import { forwardRef, useEffect, useRef } from "react";
import { WarningIcon } from "@phosphor-icons/react";

import { Text } from "../Text";

export interface InputHandles {
  onClick: () => void;
}

interface Props extends Omit<React.ComponentProps<"input">, "children"> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
  label,
  error,
  prefix,
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = inputRef.current;
    const labelEl = labelRef.current;
    const el = containerRef.current;
    if (!el || !labelEl || !inputEl) return;

    function addIsFocused() {
      el?.classList.remove("border-gray-300")
      el?.classList.remove("border-danger")
      el?.classList.add("border-blue-base")

      labelEl?.classList.remove("text-gray-500")
      labelEl?.classList.remove("text-danger")
      labelEl?.classList.add("text-blue-base")
      labelEl?.classList.add("font-bold")

      inputEl?.focus();
    }

    const removeIsFocused = () => {
      el.classList.add("border-gray-300")
      el.classList.remove("border-blue-base")

      labelEl?.classList.remove("font-bold")
      labelEl?.classList.remove("text-blue-base")
      labelEl?.classList.add("text-gray-500")
    }

    el.addEventListener("click", addIsFocused);
    inputEl.addEventListener("blur", removeIsFocused);

    return () => {
      if (el) {
        el.removeEventListener("click", addIsFocused);
        inputEl.removeEventListener("blur", removeIsFocused);
      }
    }
  }, [containerRef, labelRef, inputRef]);

  return (
    <div className="flex flex-col gap-2">
      <label 
        ref={labelRef}
        className={
          `${error ? "text-danger font-bold" : "text-gray-500"} text-[0.625rem] leading-3.5`
        }
      >
        {label}
      </label>

      <div 
        ref={containerRef} 
        className={
          `flex items-center justify-start px-4 h-12 p-2 rounded-md  border ${error ? "border-danger" : "border-gray-300"}`
        }
      >
        {prefix && (
          <Text size="md" className="text-gray-400 pointer-none:">{prefix}</Text>
        )}
        <input 
          ref={inputRef}
          className="cursor-pointer outline-none text-gray-400 placeholder:text-gray-400"
          {...props} 
        />
      </div>

      {error && (
        <div className="flex items-center gap-2">
          <WarningIcon className="text-danger" size={14} />
          <p className="text-xs leading-4 text-gray-500">{error}</p>
        </div>
      )}
    </div>
  );
});
