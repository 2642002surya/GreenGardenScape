export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Page Not Found</p>
      <a href="/" className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Go Home</a>
    </div>
  );
}
