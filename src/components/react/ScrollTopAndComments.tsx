import { useEffect, useRef } from "react";

export default function ScrollTopAndComments() {
  let divRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!divRef.current) return;

      divRef.current.classList.toggle("md:hidden", window.scrollY < 50);
      divRef.current.classList.toggle("md:flex", window.scrollY >= 50);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-8 right-8 hidden flex-col gap-3 md:hidden z-10"
      ref={divRef}
    >
      <button
        aria-label={"scroll to Top"}
        onClick={handleScrollToTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
