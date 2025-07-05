interface TextInputProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ type, name, placeholder, value, onChange }: TextInputProps) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-gray-100 border-b border-gray-300 py-3 px-4"
      required
    />
  );
}
