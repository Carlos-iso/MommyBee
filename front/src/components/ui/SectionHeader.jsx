export default function SectionHeader({ title, emoji, action = "See All" }) {
  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <h3 style={{ fontFamily: "'Fredoka One', cursive" }} className="text-lg text-gray-800 font-bold flex items-center gap-1.5">
        <span>{emoji}</span> {title}
      </h3>
      <button className="text-amber-500 text-xs font-semibold hover:underline">{action} →</button>
    </div>
  );
}
