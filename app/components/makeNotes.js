"use client";

import { createRef, useContext, useRef, useState } from "react";
import { NotesContext } from "../page";
import PinNotes from "./pinNotes";
import { env } from "@/next.config";
import MakeColor from "./colorBoard";

export default function MakeNotes() {
  const { notes, setNotes, pins, setPins } = useContext(NotesContext);
  const [showColorBoard, setShowColorBoard] = useState(false);

  const hiddenImageInput = useRef([]);
  hiddenImageInput.current = notes.map(
    (_, i) => hiddenImageInput.current[i] ?? createRef()
  );

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const title = form.get("title");
    const content = form.get("content");
    const id = Math.floor(Math.random() * Date.now());
    setNotes([...notes, { id, title, content }]);
  };

  const remove = (event) => {
    let idRemove = event.target.id;
    return setNotes(notes.filter((note) => idRemove != note.id));
  };

  const pin = (event) => {
    let idPinNote = event.target.id;
    let pinItem = notes.find((note) => idPinNote == note.id);
    if (pinItem) {
      setPins([...pins, pinItem]);
      setNotes(notes.filter((note) => idPinNote != note.id));
    }
  };

  const uploadImage = (event) => {
    const element = hiddenImageInput.current.find(
      (x) => x.current.id == event.target.id
    );
    if (element && element.current) {
      element.current.click();
    }
  };

  const selectImage = (event) => {
    const updatedNotes = notes.map((n) => {
      if (n.id == event.target.id) {
        return { ...n, img: event.target.files[0] };
      }
      return n;
    });
    setNotes([...updatedNotes]);
  };

  const selectColor = (event) => {
    setShowColorBoard(!showColorBoard);
  };

  return (
    <main className="mt-5">
      <div className="w-full flex justify-center">
        {/*The form to create notes*/}
        <div className="flex-col border-solid border-gray-700 border-2 w-1/2 rounded-lg">
          <form onSubmit={submit}>
            <input
              type="text"
              className=" w-full bg-black py-2  mt-5 placeholder:font-bold pl-4 "
              placeholder="Title"
              name="title"
            />
            <input
              type="text"
              className=" w-full bg-black py-2  mt-5 placeholder:font-bold pl-4"
              placeholder="Note here ..."
              name="content"
            />
            <div className="w-full flex ">
              <div className="flex justify-between w-1/2">
                <div className="p-2 rounded-full hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                  </svg>
                </div>

                <div className="p-2 rounded-full hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="p-2 rounded-full hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                    />
                  </svg>
                </div>
                <div className="p-2 rounded-full hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-1/2 flex justify-end">
                <div className="p-2 rounded-full hover:bg-gray-700">
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*Display notes that is pined*/}
      <PinNotes pins={pins} setPins={setPins} />
      {/*Display the notes*/}
      <div
        className="pt-10 w-full flex flex-wrap"
        key={Math.floor(Math.random() * 1000)}
      >
        {notes.map((note, idx) => {
          return (
            <div key={note.id} className="flex-col w-1/4 rounded-lg mr-5 mb-5">
              {/*Upload image */}

              <div>
                {note.img && (
                  <div>
                    <img
                      src={URL.createObjectURL(note.img)}
                      alt=""
                      className="w-full h-36 rounded-lg"
                    />
                  </div>
                )}
                <input
                  key={note.id}
                  type="file"
                  name="myImage"
                  onChange={selectImage}
                  className="hidden"
                  ref={hiddenImageInput.current[idx]}
                  id={note.id}
                />
              </div>
              {/* Note */}
              <div
                className={`${note.color} relative flex-col border-solid border-gray-700 border-2 w-full rounded-lg mr-5`}
              >
                <h1 className=" w-full mt-5  pl-4 ">{note.title}</h1>
                <h1 className=" w-full py-1  mt-5  pl-4">{note.content}</h1>
                <button className="absolute right-1 top-1" onClick={pin}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    id={note.id}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </button>
                <div className="w-full p-2 flex">
                  <div className="flex justify-between w-full">
                    {/*Remider icon*/}
                    <div className="p-1 rounded-full hover:bg-gray-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        id={note.id}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                        />
                      </svg>
                    </div>
                    {/*Image icon*/}
                    <button
                      className="p-1 rounded-full hover:bg-gray-700 cursor-pointer"
                      onClick={uploadImage}
                      id={note.id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        id={note.id}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </button>
                    {/*Color icon*/}
                    <button
                      className="p-1 rounded-full hover:bg-gray-700"
                      onClick={selectColor}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        id={note.id}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                        />
                      </svg>
                    </button>

                    {/*Remove icon*/}
                    <button
                      className="p-1 rounded-full hover:bg-gray-700"
                      onClick={remove}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        id={note.id}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/*Color board */}
              {showColorBoard && <MakeColor noteId={note.id} />}
            </div>
          );
        })}
      </div>
    </main>
  );
}
