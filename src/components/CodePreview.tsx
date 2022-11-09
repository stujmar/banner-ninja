import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
  const codeString = `${prefix}${javaScriptBody}${suffix}`;

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = codeString;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return (
    <div className="w-full rounded-lg p-3 overflow-hidden border bg-gray-200">
        <div className="flex justify-between items-baseline w-full">
          <div className="text-gray-800 font-medium text-lg">Code Preview</div>
          <button onClick={()=>copyToClipboard()} className="border-2 border-gray-700 rounded p-px hover:bg-gray-300">
            <svg  className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
        </div>
      <div className="mt-2 text-base">
        <SyntaxHighlighter language="javascript" style={docco}>
        {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;