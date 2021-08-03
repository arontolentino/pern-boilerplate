export default function Header({ children }) {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">{children}</div>
      </div>
    </header>
  );
}
