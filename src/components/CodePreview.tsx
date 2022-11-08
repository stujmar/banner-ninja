import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodePreviewProps = {
  color: string;
  idHash: string;
}

const CodePreview = ({color, idHash}: CodePreviewProps) => {

  const codeString = `
  <canvas id="bannerCanvas_${idHash}" style="width: 100%; height:256px;"></canvas>
  <script>
    const canvas = document.getElementById("bannerCanvas_${idHash}");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "${color}";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  </script>
  `;

  return (
    <div className="w-full">
      <h1 className="text-gray-50 font-medium text-xl">Code Preview</h1>
      <div className="mt-4 text-base md:text-xl">
      <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
      </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;