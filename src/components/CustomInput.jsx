const CustomInput = ({
  className,
  label,
  onChange,
  optional,
  value,
  type,
  autoComplete,
  placeholder,
  name,
}) => {
  return (
    <div>
      <label
        htmlFor={type}
        className={`${
          className ? className : " block text-sm font-medium  text-white"
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder ? placeholder : ""}
        required={!optional ? true : false}
        className="appearance-none font-body block text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-[6px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary1 focus:border-primary1 sm:text-sm"
      />
    </div>
  );
};

export default CustomInput;
