export default function Card({ children, className = '', title, action }) {
  return (
    <div className={`bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 ${className} hover:border-gray-900`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
