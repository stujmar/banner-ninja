import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type CodePreviewProps = {
  color: string;
}

const CodePreview = ({color}: CodePreviewProps) => {

  const codeString = `
  <canvas id="previewCanvas" width="100%" height="256"></canvas>
  <script>
    const canvas = document.getElementById("previewCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "${color}";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  </script>
  `;

  return (
    <div>
      <h1>Code Preview</h1>
      <div className="text-xl">
      <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
      </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePreview;