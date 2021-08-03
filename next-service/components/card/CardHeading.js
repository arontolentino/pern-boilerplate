export default function CardHeader({ children }) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <h2 className="text-2xl font-semibold">{children}</h2>
    </div>
  );
}
