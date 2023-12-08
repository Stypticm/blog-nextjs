'use client'


import { useTheme } from 'next-themes'
import { Icons } from './Icons'

const Themes = () => {
    const { theme, setTheme } = useTheme()

    return (
        <>
            {
                theme === 'dark' ? (
                    <button onClick={() => setTheme('light')}>
                        <Icons.sun />

                    </button>
                ) : (
                    <button onClick={() => setTheme('dark')}>
                        <Icons.moon />

                    </button>
                )
            }
        </>
    )
}

export default Themes