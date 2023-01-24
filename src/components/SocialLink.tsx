import React from 'react';

type SocialLinkProps = {
    text: string;
    url: string;
    svg: string;
};

const SocialLink = ({text, svg, url}: SocialLinkProps) => {
  return (
    <>
    <a target="_blank" href={url} className="text-slate-900">
      {svg}
    </a>
    </>
  );
};

export default SocialLink;