/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    700: '#1D4ED8',
                    600: '#2563EB',
                    500: '#3B82F6',
                    400: '#60A5FA',
                    100: '#DBEAFE',
                    50: '#EFF6FF',
                },
                gray: {
                    950: '#030712',
                    900: '#111827',
                    700: '#374151',
                    500: '#6B7280',
                    300: '#D1D5DB',
                    200: '#E5E7EB',
                    100: '#F3F4F6',
                    50: '#F9FAFB',
                },
                teal: {
                    600: '#0D9488',
                    50: '#F0FDFA',
                },
                rose: {
                    600: '#E11D48',
                    50: '#FFF1F2',
                },
            },
        },
    },
    plugins: [],
}
