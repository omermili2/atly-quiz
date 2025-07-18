const ATLY_LOGO = "/atly-logo.png";

export default function QuizHeader() {
  return (
    <div className="w-full flex justify-center items-start pt-0 -mt-8 mb-8">
      <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
        <img 
          src={ATLY_LOGO} 
          alt="Atly logo" 
          className="h-28 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" 
          style={{ background: 'none' }} 
        />
      </a>
    </div>
  );
} 