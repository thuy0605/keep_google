"use client";

import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../page";

export default function MakeColor({ noteId }) {
  const { notes, setNotes } = useContext(NotesContext);

  const chooseColor = (event) => {
    const updateNotes = notes.map((note) => {
      if (note.id == noteId) {
        return { ...note, color: event.target.id };
      }
      return note;
    });
    setNotes([...updateNotes]);
  };

  return (
    <div
      className="flex border-solid border-gray-700 border-2 rounded-lg p-4 w-96 mt-2"
      id={noteId}
    >
      <button onClick={chooseColor}>
        <div className="p-4 rounded-full bg-red-400 mr-1" id="bg-red-400"></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-blue-200 mr-1"
          id="bg-blue-200"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-pink-200 mr-1"
          id="bg-pink-200"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-green-200 mr-1"
          id="bg-green-200"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-orange-400 mr-1"
          id="bg-orange-400"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-amber-900 mr-1"
          id="bg-amber-900"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-lime-400 mr-1"
          id="bg-lime-400"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-purple-400 mr-1"
          id="bg-purple-400"
        ></div>
      </button>
      <button onClick={chooseColor}>
        <div
          className="p-4 rounded-full bg-green-600 mr-2"
          id="bg-green-600"
        ></div>
      </button>
    </div>
  );
}
