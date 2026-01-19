export const DepartmentSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-primaryBorder">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-100"></div>
          <div className="h-6 bg-gray-100 rounded w-2/3"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-3 bg-gray-100 rounded w-16"></div>
            <div className="h-5 bg-gray-100 rounded w-8"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
};