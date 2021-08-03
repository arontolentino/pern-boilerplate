export default function Card({ children }) {
  return (
    <div className=" bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      {children}
    </div>
  );
}
