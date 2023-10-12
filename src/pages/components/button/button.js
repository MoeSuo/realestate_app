export default function Button({ children, onClick, disabled, type='button', className }) {
  return (
    <button
      className={"w-full text-white focus:ring-4 focus:ring-stone-200 font-medium rounded px-4 py-3 mr-2 mb-2 " + (className ? className : '') + (disabled ? ' bg-gray-300 pointer-events-none' : ' bg-[#414f6f] hover:bg-[#7484a8]')}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
