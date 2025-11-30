import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/80 mt-10">
      <div className="max-w-5xl mx-auto px-4 py-3 text-[11px] sm:text-xs text-gray-600 flex flex-col gap-2">

        {/* Ligne Admin */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 justify-between">
          <p>
            Admin : Frédéric Lacoste
          </p>
        </div>

        {/* Liens */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs text-gray-500">
          
          <Link
            href="/faq"
            className="underline underline-offset-2 hover:text-[#0047B6]"
          >
            ❓ FAQ EleveAI
          </Link>

          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-[#0047B6]"
          >
            📩 Page contact
          </Link>

          <Link
            href="/sponsors"
            className="underline underline-offset-2 hover:text-[#0047B6]"
          >
            🤝 Devenir sponsor / partenaire
          </Link>
        </div>

      </div>
    </footer>
  );
}

