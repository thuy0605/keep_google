"use client";
import { createContext, useState } from "react";
import Image from "next/image";
import Header from "./components/header";
import Main from "./components/main";

//Create new context
export const NotesContext = createContext();
//Create context provider
const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [notesForSearch, setNotesForSearch] = useState([]);
  const [searchs, setSearchs] = useState([]);
  const [pins, setPins] = useState([]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        searchs,
        setSearchs,
        pins,
        setPins,
        notesForSearch,
        setNotesForSearch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export default function Home() {
  return (
    <main>
      <NotesContextProvider>
        <Header />
        <Main />
      </NotesContextProvider>
    </main>
  );
}
