import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import axios from 'axios';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import loadingGif from '../assets/loading.gif';
import Tippy from '@tippyjs/react';

type CodePreviewProps = {
  color: string;
  idHash: string;
}

const CodePreview = ({color, idHash}: CodePreviewProps) => {
  const prefix = ` <canvas id="bannerCanvas_${idHash}" style="width: 100%; height:256px;"></canvas>
  <script>`
  const javaScriptBody = `
    const canvas = document.getElementById("bannerCanvas_${idHash}");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "${color}";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
`
  const suffix = `  </script>`
  
  const [isCopying, setIsCopying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [displayCode, setDisplayCode] = useState(`${prefix}${javaScriptBody}${suffix}`);

  const copyToClipboard = () => {
    setIsCopying(true);
    const el = document.createElement('textarea');
    el.value = displayCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  }

  function minifyCode() {
    const cleanJS = javaScriptBody.replace(/const/g, 'var').replace(/let/g, 'var');
    if (isMinified) {
      setIsLoading(true);
      axios.post('https://9p9o8dnyc8.execute-api.us-east-1.amazonaws.com/minify', { cleanJS }, {
      headers: {
        'Content-Type': 'application/json',
      }})
      .then(function (response) {
        setDisplayCode( `${prefix}${response.data}${suffix}`);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
    } else {
      setDisplayCode(`${prefix}${javaScriptBody}${suffix}`);
    }
  }

  useEffect(() => { // minify code on checkbox change
    minifyCode();
  }, [isMinified]);

  useEffect(() => { // update code on color change
    if (!isMinified) {
      setDisplayCode(`${prefix}${javaScriptBody}${suffix}`);
    } else {
      minifyCode();
    }
  }, [color])

  const minifyInfo = () => {}

  return (
    <div className="w-full rounded-lg p-3 relative overflow-hidden border border-slate-300 shadow-md bg-white">
        <div className="flex justify-between items-end w-full">
          <div className="flex items-end gap-4">
          <div className="text-slate-800 font-medium text-lg">Code Preview</div>
          <label className="flex">
              <input
                className="mr-2"
                type="checkbox"
                checked={isMinified}
                onChange={()=>{setIsMinified(!isMinified)}}
                />
              <div className="flex gap-1 items">
                <span className="-ml-1 text-slate-900">Minify</span>
                <Tippy placement="right" theme="material" content={
                  <div className="text-sm leading-3 w-max font-medium text-red-800">
                    <span>For best performance </span><br />
                    <span className=" inline-block mt-1">have minify off while editing.</span></div>}
                    >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                </Tippy>
              </div>
            </label>
          </div>
          <div className="flex justify-end items-center">
          <div className={`bg-green-200 p-1 rounded-lg shadow  text-sm font-bold text-green-600 mr-2 transition-all ${isCopying ? "opacity-100" : "opacity-0"}`}>COPIED</div>
          <button onClick={()=>copyToClipboard()} className="text-gray-600 border-2 border-slate-500 rounded p-px hover:bg-slate-100">
            <svg  className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
          </div>
        </div>
      <div className="mt-2 text-base relative">
        {isLoading && <div className="absolute h-full w-full z-20 inset-0 bg-slate-50 flex justify-center items-center">
          <img className="opacity-50 w-16" src={loadingGif} />
        </div>}
        <div className="relative border border-slate-300 rounded-md overflow-hidden">
        <SyntaxHighlighter language="javascript" style={docco}>
        {displayCode}
        </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodePreview;