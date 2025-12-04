const DashboardOverview = () => {
  return (
    <div className="">
      <section className="bg-linear-to-r from-primary to-secondary rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">مرحباً بعودتك، د. أحمد! 👋</h1>
        <p className="text-blue-100">إليك نظرة عامة على أداء العيادة اليوم</p>
      </section>

      <table className="w-full mt-6 table-auto border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">المؤشر</th>
            <th className="border border-gray-300 px-4 py-2">القيمة</th>
            <th className="border border-gray-300 px-4 py-2">التغير عن الأمس</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">عدد المواعيد</td>
            <td className="border border-gray-300 px-4 py-2">25</td>
            <td className="border border-gray-300 px-4 py-2 text-green-600">+5 (20%)</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">عدد المرضى الجدد</td>
            <td className="border border-gray-300 px-4 py-2">8</td>
            <td className="border border-gray-300 px-4 py-2 text-red-600">-2 (-20%)</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">الإيرادات اليومية</td>
            <td className="border border-gray-300 px-4 py-2">3,500 ر.س</td>
            <td className="border border-gray-300 px-4 py-2 text-green-600">+500 ر.س (16.7%)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardOverview;
