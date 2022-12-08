import React, { useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader, SyncLoader } from "react-spinners";
import Image from "next/image";
import Head from "next/head";

const ImageGeneration = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [width, setWidth] = useState<number>(540);
  const [height, setHeight] = useState<number>(540);
  const [result, setResult] = useState<string>("");
  const [isLoadingResult, setIsLoadingResult] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoadingResult(true);
    try {
      const submit = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/image-generate`,
        data: {
          prompt: prompt,
          size: `${width}x${height}`,
        },
      });

      console.log(submit.data.imageUrl);
      setResult(submit.data.imageUrl);
    } catch (err: unknown) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
    setIsLoadingResult(false);
  };
  return (
    <>
      <Head>
        <title>Playground | Image Generator</title>
      </Head>
      <h3 className="text-2xl text-center">Image Generator</h3>
      {isError && (
        <div className="py-4 w-full bg-red-200 rounded-md text-center text-red-700">
          Something went wrong :(
        </div>
      )}
      <div className="w-full border rounded-lg p-3 mt-5 flex justify-between space-x-5">
        <>
          <div className="w-2/4 p-3 flex flex-col justify-between">
            <h4 className="text-md text-gray-700 h-16">
              Enter your text and set width & height
            </h4>
            <div className="flex flex-col space-y-4 mt-2">
              <input
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Input your text"
                className="w-full px-3 py-2 border border-slate-200 outline-none rounded-sm focus:outline-2 focus:outline-emerald-500"
              />
              <div className="flex w-full space-x-2">
                <input
                  type="number"
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  placeholder="Width"
                  defaultValue={width}
                  className="w-full px-3 py-2 border border-slate-200 outline-none rounded-sm focus:outline-2 focus:outline-emerald-500"
                />
                <input
                  type="text"
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  defaultValue={height}
                  placeholder="Height"
                  className="w-full px-3 py-2 border border-slate-200 outline-none rounded-sm focus:outline-2 focus:outline-emerald-500"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 text-white py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
          {isLoadingResult ? (
            <div className="w-2/4 border border-slate-200 rounded-lg flex items-center justify-center">
              <SyncLoader color="#10b981" />
            </div>
          ) : (
            <div className="w-2/4 max-w-2/4 h-64 max-h-64 border border-slate-200 flex items-center justify-center">
              {result != "" ? (
                <Image
                  alt={prompt}
                  src={result}
                  width={240}
                  height={240}
                  className="max-w-2/4 max-h-64"
                />
              ) : (
                "Success result"
              )}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ImageGeneration;
