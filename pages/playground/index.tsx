import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import ImageGeneration from "./image";
import TextGenerate from "./text";

function Playground() {
  const [type, setType] = useState<"text" | "image">("text");
  return (
    <>
      <section
        className={
          styles.home +
          " h-80 bg-blue-500 justify-center flex flex-col items-center"
        }
      >
        <h1 className="text-4xl text-white">Playground</h1>
        <div className="flex space-x-2 p-1 rounded-lg bg-white justify-center mt-4">
          <button
            onClick={(e) => setType("text")}
            className={`px-4 py-1 rounded-md ${
              type == "text" && "bg-emerald-500 text-white"
            }`}
          >
            Text
          </button>
          <button
            onClick={(e) => setType("image")}
            className={`px-4 py-1 rounded-md ${
              type == "image" && "bg-emerald-500 text-white"
            }`}
          >
            Image
          </button>
        </div>
      </section>
      <section className="px-24 w-3/4 py-10 mx-auto">
        {type == "text" && <TextGenerate />}
        {type == "image" && <ImageGeneration />}
      </section>
    </>
  );
}

export default Playground;
