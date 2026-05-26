import { cn } from "@/lib/cn";
import { languageLabels, type Language } from "@/lib/site-content";

type LanguageSwitchProps = {
  compact?: boolean;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function LanguageSwitch({
  compact = false,
  language,
  onLanguageChange,
}: LanguageSwitchProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[6px] border border-border bg-[rgba(35,24,21,0.28)] p-1",
        compact && "w-full justify-between",
      )}
    >
      {(["en", "zh"] as const).map((option) => {
        const active = option === language;

        return (
          <button
            aria-pressed={active}
            className={cn(
              "rounded-[4px] px-3 py-1.5 text-xs font-medium transition-[background-color,color,box-shadow] duration-300",
              active
                ? "bg-green text-text shadow-[0_0_16px_rgba(90,181,70,0.2)]"
                : "text-muted hover:text-text",
            )}
            key={option}
            onClick={() => onLanguageChange(option)}
            type="button"
          >
            {languageLabels[option]}
          </button>
        );
      })}
    </div>
  );
}
