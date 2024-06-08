import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";

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
    tagString: string;
    title: string;
    summary: string;
    slug: string;
    cover: { src: string };
    date: Date;
  };
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem["data"];
  refIndex: number;
}

const Example = ({ searchList }: Props) => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(false);

  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const postsToSearch = searchList?.map(({ data, slug }) => ({
    ...data,
    slug,
    tagString: data?.tags?.map(({ slug }) => slug).join(","),
  }));

  const fuse = useMemo(
    () =>
      new Fuse(postsToSearch, {
        keys: ["title", "summary", "tagString"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

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

  const filteredItems = filterItems(
    searchResults?.length
      ? searchResults?.map(({ item }) => ({
          id: item.slug,
          items: [
            { id: item.slug, children: item.title, href: `/blog/${item.slug}` },
          ],
        }))
      : searchList?.map(({ data: { title }, slug }) => ({
          id: slug,
          items: [{ id: slug, children: title, href: `/blog/${slug}` }],
        })),
    inputVal
  );

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}>
        <svg
          className="feather feather-search"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
        </svg>
      </button>
    );
  }

  return (
    <CommandPalette
      onChangeSearch={setInputVal}
      onChangeOpen={setOpen}
      search={inputVal}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Example;
