"use client";
import { Monitor } from "lucide-react";
import { useEffect, useRef } from "react";
export const themeScript = `(function(){try{var t=localStorage.getItem('kleronomia-theme');if(!['light','dark','system'].includes(t))t='system';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t==='system'?'light dark':t}catch(e){}})()`;
export function ThemeControl() {
  const ref = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (ref.current)
      ref.current.value = document.documentElement.dataset.theme || "system";
  }, []);
  return (
    <label className="theme-control">
      <Monitor size={15} />
      <span className="sr-only">Color theme</span>
      <select
        ref={ref}
        defaultValue="system"
        onChange={(event) => {
          const theme = event.target.value;
          document.documentElement.dataset.theme = theme;
          document.documentElement.style.colorScheme =
            theme === "system" ? "light dark" : theme;
          try {
            localStorage.setItem("kleronomia-theme", theme);
          } catch {}
        }}
      >
        <option value="system">System theme</option>
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
      </select>
    </label>
  );
}
