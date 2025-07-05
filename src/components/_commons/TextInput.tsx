export default function TextInput({ type, name, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-gray-100 border-b border-b-gray-300 py-3 px-4"
      required
    />
  );
}
