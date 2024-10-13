import { SearchIcon } from "lucide-react";

interface SearchFormProps {
  search: string;
  setSearch: (search: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({ search, setSearch, handleSearch }: SearchFormProps) {
  return (
    <form
      action=""
      onSubmit={handleSearch}
      className="flex w-full h-fit border-[2px] border-ringColor rounded-xl sm:w-[500px] sm:justify-between self-center"
      data-testid="search-form"
    >
      <label htmlFor="search" className="w-full">
        <input
          type="text"
          name='search'
          value={search}
          placeholder="Procurar"
          className="focus:outline-none border-none text-lg sm:text-xl bg-transparent p-3 rounded-s-xl w-full text-white font-comicNeue"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <button type="submit"
        className='p-3 focus:outline-none border-none relative group text-white'
        data-testid="search-button">
        <SearchIcon size={28} className="group-focus:border border-white rounded" />
      </button>
    </form>
  )
}
