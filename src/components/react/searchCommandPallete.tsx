// import "react-cmdk/dist/cmdk.css";
// import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
// import { useEffect, useMemo, useState } from "react";
// import Fuse from "fuse.js";

// export type SearchItem = {
//   id: string;
//   body: string;
//   collection: string;
//   data: {
//     tags: {
//       collection: "tags";
//       id: string;
//     }[];
//     tagString: string;
//     title: string;
//     summary: string;
//     id: string;
//     cover: { src: string };
//     date: Date;
//   };
// };

// interface Props {
//   searchList: SearchItem[];
// }

// interface SearchResult {
//   item: SearchItem["data"];
//   refIndex: number;
// }

// const Example = ({ searchList }: Props) => {
//   const [page] = useState<"root" | "projects">("root");
//   const [open, setOpen] = useState<boolean>(false);

//   const [inputVal, setInputVal] = useState("");
//   const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
//     null
//   );

//   const postsToSearch = searchList?.map(({ data, id }) => ({
//     ...data,
//     id,
//     tagString: data?.tags?.map(({ id }) => id).join(","),
//   }));

//   const fuse = useMemo(
//     () =>
//       new Fuse(postsToSearch, {
//         keys: ["title", "summary", "tagString"],
//         includeMatches: true,
//         minMatchCharLength: 2,
//         threshold: 0.5,
//       }),
//     [searchList]
//   );

//   useEffect(() => {
//     const searchUrl = new URLSearchParams(window.location.search);
//     const searchStr = searchUrl.get("q");
//     if (searchStr) setInputVal(searchStr);
//   }, []);

//   useEffect(() => {
//     let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
//     setSearchResults(inputResult);

//     if (inputVal.length > 0) {
//       const searchParams = new URLSearchParams(window.location.search);
//       searchParams.set("q", inputVal);
//       const newRelativePathQuery =
//         window.location.pathname + "?" + searchParams.toString();
//       history.replaceState(history.state, "", newRelativePathQuery);
//     } else {
//       history.replaceState(history.state, "", window.location.pathname);
//     }
//   }, [inputVal]);

//   const filteredItems = filterItems(
//     [
//       {
//         id: "",
//         heading: "articles",
//         items: searchResults?.length
//           ? searchResults?.map(({ item: { title, id, tags } }) => ({
//               id,
//               children: (
//                 <div>
//                   <div className="font-bold text-lg">{title}</div>
//                   <div>
//                     {tags.map((tag) => (
//                       <div
//                         key={tag.id}
//                         className="text-[0.9em] my-1 font-bold text-primary-500"
//                       >
//                         {tag.id}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ),
//             href: `/${id}`,
//             }))
//           : searchList?.map(({ data: { title, tags }, id }) => ({
//               id,
//               children: (
//                 <div>
//                   <div className="font-bold text-lg">{title}</div>
//                   <div>
//                     {tags.map((tag) => (
//                       <div
//                         key={tag.id}
//                         className="text-[0.9em] my-1 font-bold text-primary-500"
//                       >
//                         {tag.id}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ),
//             href: `/${id}`,
//             })),
//       },
//     ],
//     ""
//   );
//   if (!open) {
//     return (
//       <button className="mt-2" onClick={() => setOpen(true)}>
//         <svg
//           className="feather feather-search"
//           fill="none"
//           height="24"
//           stroke="currentColor"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           width="24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <circle cx="11" cy="11" r="8"></circle>
//           <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
//         </svg>
//       </button>
//     );
//   }

//   return (
//     <CommandPalette
//       onChangeSearch={setInputVal}
//       onChangeOpen={setOpen}
//       search={inputVal}
//       isOpen={open}
//       placeholder="Search Articles"
//       page={page}
//     >
//       <CommandPalette.Page id="root">
//         {filteredItems.length ? (
//           filteredItems.map((list) => (
//             <CommandPalette.List key={list.id} heading={list.heading}>
//               {list.items.map(({ id, ...rest }) => (
//                 <CommandPalette.ListItem
//                   key={id}
//                   index={getItemIndex(filteredItems, id)}
//                   {...rest}
//                 />
//               ))}
//               <div></div>
//             </CommandPalette.List>
//           ))
//         ) : (
//           <CommandPalette.FreeSearchAction />
//         )}
//       </CommandPalette.Page>
//     </CommandPalette>
//   );
// };

// export default Example;
