import { Monitor, Smartphone } from "lucide-react";

function MobileRestrictionCard() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-white dark:from-black dark:to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Monitor className="w-16 h-16 text-gray-800 dark:text-gray-200" />
            <div className="absolute -bottom-1 -right-1 bg-gray-700 dark:bg-gray-400 rounded-full p-1">
              <Smartphone className="w-4 h-4 text-white dark:text-black" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-black dark:text-white mb-3">
          Desktop Required
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Our code editor is available on desktop only.
        </p>

        {/* Call to action */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">
            Please switch to a desktop browser to continue coding
          </p>
        </div>
      </div>
    </div>
  );
}

export { MobileRestrictionCard };
