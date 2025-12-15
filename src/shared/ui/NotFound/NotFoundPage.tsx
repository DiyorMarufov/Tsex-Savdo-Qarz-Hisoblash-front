import { memo } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-3.5">
      <div className="text-center p-8 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Kechirasiz, sahifa topilmadi.
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Siz qidirayotgan sahifa o'chirilgan, nomi o'zgartirilgan yoki
          vaqtinchalik mavjud emas.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          🏠 Asosiy sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default memo(NotFoundPage);
