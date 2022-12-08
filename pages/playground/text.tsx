import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { FadeLoader, SyncLoader } from "react-spinners";

const TextGenerate = () => {
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<string>("Here's the result");
  const [isLoadingResult, setIsLoadingResult] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoadingResult(true);
    try {
      const submit = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/completions`,
        data: {
          model: selectedModel,
          prompt: prompt,
        },
      });

      setResult(submit.data.choices[0].text);
    } catch (err: unknown) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
    setIsLoadingResult(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/models`, {
        method: "GET",
      });
      const result = await data.json();

      // console.log(result.model);
      setModels(result.model);
      setSelectedModel(result.model[0].id);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Playground | Text Completion</title>
      </Head>
      <h3 className="text-2xl text-center">Text Completion</h3>
      {isError && (
        <div className="py-4 w-full bg-red-200 rounded-md text-center text-red-700">
          Something went wrong :(
        </div>
      )}
      <div className="w-full border rounded-lg p-3 mt-5 flex justify-between space-x-5">
        {isLoading ? (
          <div className="mx-auto">
            <FadeLoader color="#10b981" />
          </div>
        ) : (
          <>
            <div className="w-2/4 p-3 flex flex-col h-46 justify-between">
              <h4 className="text-md text-gray-700">
                Choose model and enter your input
              </h4>
              <div className="flex flex-col space-y-4 mt-2">
                <input
                  type="text"
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Input your text"
                  className="w-full px-3 py-2 border border-slate-200 outline-none rounded-sm focus:outline-2 focus:outline-emerald-500"
                />
                <select
                  onChange={(e) => setSelectedModel(e.target.value)}
                  placeholder="Input your text"
                  className="w-full px-3 text-dark py-2 border border-slate-200 outline-none rounded-sm focus:outline-2 focus:outline-emerald-500"
                >
                  {models.map((model: any) => (
                    <option key={model.permission.id} value={model.id}>
                      {model.id}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 text-white py-2 rounded-md"
              >
                Submit
              </button>
            </div>
            {isLoadingResult ? (
              <div className="w-2/4 border border-slate-200 rounded-lg flex items-center justify-center">
                <SyncLoader color="#10b981" />
              </div>
            ) : (
              <textarea
                name=""
                id=""
                cols={50}
                rows={10}
                readOnly
                className="w-2/4 border border-slate-200 rounded-lg p-3 outline-none"
                value={result}
                defaultValue={"Here's the result will appeared"}
              ></textarea>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TextGenerate;
