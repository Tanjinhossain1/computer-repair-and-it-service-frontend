import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  style?: any;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  style,
}: TextAreaProps) => {
  const { control } = useFormContext();
  control._defaultValues[name] = value ? value : ""  
  return (
    <div className={`flex flex-col  w-full`}>
      {label ? label : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
          style={{...style}}
            rows={rows}
            placeholder={placeholder}
            {...field}
            value={field.value ? field.value : ""}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
