export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12">
      <div className="text-8xl font-semibold text-orange-400">;-;</div>
      <div className="space-y-4 text-center">
        <div className="text-2xl font-medium text-gray-700">
          Ohh No! Page Not Found
        </div>
        <div className="text-center text-gray-500">
          The page you are looking for does not exist or has been moved.
        </div>
      </div>
    </div>
  )
}
