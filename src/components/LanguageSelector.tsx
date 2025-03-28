import { locales } from '../hooks/useBookGenerator';

type Props = {
    locale: keyof typeof locales;
    setLocale: (locale: keyof typeof locales) => void;
};

export const LanguageSelector = ({ locale, setLocale }: Props) => (
    <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as keyof typeof locales)}
        className="p-2 border rounded"
    >
        {Object.entries(locales).map(([code, name]) => (
            <option key={code} value={code}>
                {name}
            </option>
        ))}
    </select>
);