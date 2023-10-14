"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  prefix?: any;
  style?: any;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  prefix,
  style,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  control._defaultValues[name]=value ? value : ""
  return (
    <>
      <span>{label ? label : null}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              style={{ ...style }}
              prefix={prefix}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={ field.value} 
            />
          ) : (
            <Input
              style={{ ...style }}
              prefix={prefix}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field} 
              value={ field.value ? field.value : ""}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
