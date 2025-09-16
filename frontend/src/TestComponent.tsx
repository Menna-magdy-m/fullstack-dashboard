import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="p-8">
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
        Test Blue Box - إذا ظهر هذا باللون الأزرق، فإن Tailwind يعمل
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg">
        Test Green Box - إذا ظهر هذا باللون الأخضر، فإن Tailwind يعمل
      </div>
    </div>
  );
};

export default TestComponent;