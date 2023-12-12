'use client'

import { useTheme } from 'next-themes'
import { Icons } from './Icons'
import useHasMounted from '@hooks/use-has-mounted'

const Themes = () => {
    const { theme, setTheme } = useTheme()
    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return null
    }

    return (
        <>
            <button
                onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
                aria-label='Theme'
            >
                {
                    theme === 'dark' ? (
                        <Icons.sun />
                    ) : (
                        <Icons.moon />
                    )
                }
            </button>
        </>
    )
}

export default Themes