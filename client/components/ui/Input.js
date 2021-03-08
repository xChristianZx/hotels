export const Input = ({
  className,
  labelName,
  minValue,
  name,
  onChangeHandler,
  placeholder,
  showLabel,
  type,
  value,
}) => {
  return (
    <div className="w-full">
      <label
        className={`${
          showLabel ? 'capitalize' : 'sr-only'
        } self-start text-gray-400 text-xs font-light pl-4`}
        htmlFor={name}
      >
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder || name}
        min={minValue}
        onChange={e => onChangeHandler(e.target.value)}
        value={value}
        className={`${className} px-4 py-2 w-full border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 focus:ring-0 bg-transparent`}
      />
    </div>
  );
};