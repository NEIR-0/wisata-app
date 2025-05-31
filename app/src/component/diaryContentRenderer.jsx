import React from 'react';
import { renderDiaryContent } from '../../../utils/cms';

const TiktokEmbed = ({ url }) => {
  const getTikTokVideoId = (url) => {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : null;
  };

  const videoId = getTikTokVideoId(url);
  
  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-full max-w-md">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

const YoutubeEmbed = ({ url }) => {
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);
  
  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full flex justify-center my-6">
      <blockquote 
        className="instagram-media" 
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  );
};

const TwitterEmbed = ({ url }) => {
  return (
    <div className="w-full flex justify-center my-6">
      <blockquote className="twitter-tweet">
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Tweet
        </a>
      </blockquote>
    </div>
  );
};

const DiaryContentRenderer = ({ content }) => {
  const parsedContent = renderDiaryContent(content);
  
  if (!parsedContent || parsedContent.length === 0) {
    return <div>No content available</div>;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {parsedContent.map((element) => {
        switch (element.type) {
          case 'paragraph':
            return (
              <div key={element.key} className="mb-4">
                <span dangerouslySetInnerHTML={{ __html: element.content }} />
              </div>
            );
          
          case 'h1':
            return (
              <h1 key={element.key} className="text-4xl font-bold mt-8 mb-4">
                {element.content}
              </h1>
            );
          
          case 'h2':
            return (
              <h2 key={element.key} className="text-3xl font-bold mt-8 mb-4">
                {element.content}
              </h2>
            );
          
          case 'h3':
            return (
              <h3 key={element.key} className="text-2xl font-bold mt-8 mb-4">
                {element.content}
              </h3>
            );
          
          case 'image':
            return (
              <div key={element.key} className="w-full my-6">
                <img 
                  src={element.src} 
                  alt={element.alt} 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            );
          
          case 'list':
            return (
              <ul key={element.key} className="list-disc pl-6 mb-2 space-y-1">
                <li>
                  <span dangerouslySetInnerHTML={{ __html: element.content }} />
                </li>
              </ul>
            );
          
          case 'tiktok':
            return <TiktokEmbed key={element.key} url={element.url} />;
          
          case 'youtube':
            return <YoutubeEmbed key={element.key} url={element.url} />;
          
          case 'instagram':
            return <InstagramEmbed key={element.key} url={element.url} />;
          
          case 'twitter':
            return <TwitterEmbed key={element.key} url={element.url} />;
          
          default:
            return null;
        }
      })}
    </div>
  );
};

export default DiaryContentRenderer;