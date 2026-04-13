import { FOOTER_COLUMNS, PERSONAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          <div className="col-span-2">
            <p className="font-bold text-xl text-[#0d1040] mb-1">
              {PERSONAL.name.split(" ")[0]}<span className="text-[#2d3393]">.</span>dev
            </p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-2">
              {PERSONAL.tagline}
            </p>
            <div className="flex gap-3 mt-4">
              {[["GitHub", PERSONAL.github], ["LinkedIn", PERSONAL.linkedin], ["Email", `mailto:${PERSONAL.email}`]].map(([label, href]) => (
                <a key={label} href={href}
                  className="text-xs font-medium text-gray-400 hover:text-[#2d3393] transition-colors border border-gray-200 rounded-lg px-3 py-1.5 hover:border-[#2d3393]/30">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-sm text-[#0d1040] mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-sm text-gray-500 hover:text-[#2d3393] transition-colors inline-flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-semibold bg-[#eef1fb] text-[#2d3393] px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">© 2025 {PERSONAL.name}. All Rights Reserved.</p>
          <a href="#home" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2d3393] transition-colors font-medium">
            <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:border-[#2d3393]/40">↑</span>
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
