import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import axios from 'axios';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
  const [isMinified, setIsMinified] = useState(false);
  const [displayCode, setDisplayCode] = useState(`${prefix}${javaScriptBody}${suffix}`);
  // const codeString = `${prefix}${javaScriptBody}${suffix}`;

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



  useEffect(() => {
    const cleanJS = javaScriptBody.replace(/const/g, 'var').replace(/let/g, 'var');
    if (isMinified) {
      axios.post('https://9p9o8dnyc8.execute-api.us-east-1.amazonaws.com/minify', { code: cleanJS }, {
      headers: {
        'Content-Type': 'application/json',
      }})
      .then(function (response) {
        console.log(response);
        setDisplayCode( `${prefix}${response.data.body}${suffix}`);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [isMinified]);


  return (
    <div className="w-full rounded-lg p-3 overflow-hidden border bg-gray-200">
        <div className="flex justify-between items-end w-full">
          <div className="flex items-end gap-4">
          <div className="text-gray-800 font-medium text-lg">Code Preview</div>
            <label className="flex">
              <input
                className="mr-2"
                type="checkbox"
                checked={isMinified}
                onChange={()=>{setIsMinified(!isMinified)}}
                />
              <p>Minify <span className="text-sm text-gray-500">(warning beta)</span></p>
            </label>
          </div>
          <div className="flex justify-end items-center">
          <div className={`bg-green-200 p-1 rounded-lg shadow  text-sm font-bold text-green-600 mr-2 transition-all ${isCopying ? "opacity-100" : "opacity-0"}`}>COPIED</div>
          <button onClick={()=>copyToClipboard()} className="text-gray-600 border-2 border-gray-600 rounded p-px hover:bg-gray-300">
            <svg  className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
          </div>
        </div>
      <div className="mt-2 text-base">
        <SyntaxHighlighter language="javascript" style={docco}>
        {displayCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;