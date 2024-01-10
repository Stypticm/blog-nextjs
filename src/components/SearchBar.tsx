import { getFilteredBlogs } from '@utils/blog_helpers'
import { Input } from './ui/Input'
import { useState } from 'react'
import { Post, SearchBarProps } from '@utils/types'

const SearchBar = ({ setFilteredBlogs, currentBlogs }: SearchBarProps) => {

    const [search, setSearch] = useState<string>('')
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setSearch(searchText)

        if (timer) clearTimeout(timer)

        const filterBlogs = async () => {
            if (search === '') {
                setFilteredBlogs(currentBlogs as Post[])
            } else {
                const filteredBlogs = await getFilteredBlogs(searchText, currentBlogs)
                setFilteredBlogs(filteredBlogs as Post[])
            }
        }

        const newTimer = setTimeout(filterBlogs, 500)

        setTimer(newTimer)
    }

    return (
        <>
            <Input
                onChange={handleSearch}
                type="text"
                placeholder="Search post..."
                value={search}
            />
        </>
    )
}

export default SearchBar