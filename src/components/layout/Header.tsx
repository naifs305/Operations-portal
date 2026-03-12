'use client';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <img
            src="https://nauss.edu.sa/Style%20Library/ar-sa/Styles/images/home/Logo.svg"
            className="h-16"
          />

          <div>
            <h1 className="text-2xl font-bold text-teal-800">
              بوابة إدارة عمليات التدريب
            </h1>
            <p className="text-sm text-gray-500">
              جامعة نايف العربية للعلوم الأمنية
            </p>
          </div>
        </div>

        <a
          href="/admin"
          className="text-sm text-gray-600 hover:text-black"
        >
          إدارة البوابة
        </a>

      </div>
    </header>
  );
}