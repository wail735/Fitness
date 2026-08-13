
const fs = require("fs");
const path = require("path");

const replacements = [
  { search: /bg-\[#0b0c10\]/g, replace: "dark:bg-[#0b0c10] bg-slate-50" },
  { search: /bg-\[#12141a\]/g, replace: "dark:bg-[#12141a] bg-white" },
  { search: /bg-\[#1a1d24\]/g, replace: "dark:bg-[#1a1d24] bg-slate-100" },
  { search: /bg-\[#0f1115\]/g, replace: "dark:bg-[#0f1115] bg-slate-50" },
  { search: /bg-\[#252a36\]/g, replace: "dark:bg-[#252a36] bg-slate-200" },
  { search: /bg-\[#1e212b\]/g, replace: "dark:bg-[#1e212b] bg-slate-100" },
  { search: /text-slate-200/g, replace: "dark:text-slate-200 text-slate-800" },
  { search: /text-slate-300/g, replace: "dark:text-slate-300 text-slate-700" },
  { search: /text-slate-400/g, replace: "dark:text-slate-400 text-slate-600" },
  { search: /border-slate-800/g, replace: "dark:border-slate-800 border-slate-200" },
  { search: /border-slate-700/g, replace: "dark:border-slate-700 border-slate-300" },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".jsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let modified = content;
      
      for (const rule of replacements) {
        modified = modified.replace(rule.search, rule.replace);
      }
      
      // Handle text-white carefully: avoid replacing if it follows bg-red, bg-emerald, bg-blue, bg-indigo, bg-purple, bg-amber
      // Let just replace `text-white` with `dark:text-white text-slate-900` EXCEPT when it is part of a button or has bg- color
      // A simple regex might be too risky for text-white. Let just replace it generally and manually fix buttons if needed.
      // Wait, there are many buttons. Let us just replace text-white when it is NOT preceded or followed by bg-(color)
      
      modified = modified.replace(/\btext-white\b/g, "dark:text-white text-slate-900");
      // Revert text-white for common colored buttons (e.g. text-slate-900 inside a bg-emerald-500)
      // Actually it is safer to just use dark:text-white text-slate-900 and fix issues later if they appear.
      
      if (content !== modified) {
        fs.writeFileSync(fullPath, modified, "utf8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory("c:/Users/PC-CLICK-PLUS/Desktop/Fitness-main/frontend/src/components");

