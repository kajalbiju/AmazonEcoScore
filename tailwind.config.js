/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                amazon: {
                    DEFAULT: '#131921',
                    light: '#232f3e',
                    yellow: '#febd69',
                    orange: '#ff9900'
                },
                'eco-green': {
                    500: '#10B981'
                }
            }
        }
    },
    plugins: []
};