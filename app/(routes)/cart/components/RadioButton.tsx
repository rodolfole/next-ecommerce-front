import { ChangeEvent, FC } from "react";
import { IconType } from "react-icons";

type Props = {
  icon?: IconType;
  id: string;
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const RadioButton: FC<Props> = ({
  icon: Icon,
  id,
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <>
      <label htmlFor={id} className="cursor-pointer mb-3">
        <input
          className="peer sr-only"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={(event) => {
            onChange && onChange(event);
          }}
        />
        <div className="w-72 max-w-xl p-5 bg-white text-gray-900 rounded-md hover:shadow ring-2 ring-transparent peer-checked:text-sky-600 peer-checked:ring-sky-500 peer-checked:ring-offset-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-end justify-between">
              <p>
                <span className='className="text-lg font-bold"'>{label}</span>
              </p>
              <p className="text-sm font-bold">
                {Icon && <Icon className="w-10 h-10" />}
              </p>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default RadioButton;
