import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    tags: {
      collection: "tags";
      slug: string;
    }[];
    title: string;
    summary: string;
    slug: string;
    cover: string;
  };
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem["data"];
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const postsToSearch = searchList.map(({ data, slug }) => ({ ...data, slug }));

  console.log("list", searchList);

  const fuse = useMemo(
    () =>
      new Fuse(postsToSearch, {
        keys: ["title", "description", "tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if
    // input value is more than one character
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    console.log("input result", inputResult);
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <label className="relative block">
        <input
          className="block w-full rounded border border-skin-fill 
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none text-black"
          placeholder="Search for anything..."
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          // autoFocus
          ref={inputRef}
        />
      </label>

      {inputVal.length > 1 && (
        <div className="mt-8">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal}'
        </div>
      )}

      <ul>
        {searchResults &&
          searchResults.map(({ item: { slug, ...prop }, refIndex }) => (
            <Card href={`/blog/${slug}`} {...prop} />
          ))}
      </ul>
    </>
  );
}

function Card({
  href,
  summary,
  tags,
  title,

  cover,
}: Omit<SearchItem["data"], "slug"> & { href: string }) {
  return (
    <div className="space-y-2 my-3 xl:grid xl:grid-cols-4 space-x-4 xl:space-y-0 xl:items-stretch">
      <Cover cover={cover} date={new Date()} title={title} />
      <div className="space-y-5 xl:col-span-3">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <a
                transition:name={title}
                href={href}
                className="text-gray-900 dark:text-gray-100"
              >
                {title}
              </a>
            </h2>
            <div className="flex flex-wrap">
              {tags.map(({ slug }) => (
                <a
                  transition:name={slug}
                  href={`/tags/${slug}`}
                  class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                ></a>
              ))}
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            {summary}
          </div>
        </div>
        <div className="text-base font-medium leading-6">
          <a
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            // aria-label={t("pages.home.readMoreAbout", { title })}
          >
            Read More &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

function Cover({
  cover,
  title,
  date,
}: {
  title: string;
  cover: string;
  date: Date;
}) {
  console.log(cover);

  return (
    <div
      transition:name={`${title}-img`}
      class="relative h-[200px] overflow-hidden bg-primary-50 dark:bg-opacity-10 rounded-lg"
    >
      {cover && (
        <img
          src={cover}
          alt={title}
          // widths={[300, 600, 1000]}
          sizes="(max-width: 767px) 100vw, 300px"
          className="object-cover absolute inset-0 w-full h-full z-0"
        />
      )}
      <dl>
        {/* <dt className="sr-only">{t("components.listPostCover.publishedAt")}</dt> */}
        <dd className="text-xs py-0 px-2 font-medium leading-6 text-primary-50 bg-primary-700 rounded-lg m-1 absolute bottom-0 z-10">
          {date.toISOString()}
        </dd>
      </dl>
    </div>
  );
}
