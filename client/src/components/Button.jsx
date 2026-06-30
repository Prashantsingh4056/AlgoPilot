export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    outline: 'border border-slate-600 hover:bg-slate-800 text-slate-200',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-3 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
