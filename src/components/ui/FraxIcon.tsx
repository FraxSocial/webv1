interface FraxIconProps {
  className?: string;
}

export default function FraxIcon({ className = "" }: FraxIconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.2l7.8 7.8-7.8 7.8-7.8-7.8 7.8-7.8z"
      />
    </svg>
  );
}
