
export default function CardButton({ children, color, onClick }) {
    return (
        <button className={`flashcard--button ${color}`} onClick={onClick}>
            {children}
        </button>
  );

}