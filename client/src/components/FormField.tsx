interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRandomPrompt?: boolean;
  handleRandomPrompt?: () => void;
}

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isRandomPrompt,
  handleRandomPrompt,
}: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {labelName}
        </label>
        {isRandomPrompt && (
          <button
            type="button"
            onClick={handleRandomPrompt}
            className="font-semibold text-xs bg-slate-300 rounded-md text-slate-700 p-2"
          >
            Generate random prompt
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-lg outline-none w-full max-w-7xl p-3 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );
};

export default FormField;
