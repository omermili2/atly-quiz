type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export default function ContinueButton({ isVisible, onClick }: Props) {
  return (
    <div className="mt-8">
      <div className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button
          onClick={onClick}
          className="w-full max-w-xs bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-transform duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 