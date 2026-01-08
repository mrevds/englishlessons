import React from 'react';
import type { ContentBlock } from '../data/lessonsContent';

interface LessonContentBlockProps {
  block: ContentBlock;
}

export const LessonContentBlock: React.FC<LessonContentBlockProps> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <p 
          className="text-gray-700 dark:text-gray-300 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: block.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      );

    case 'heading':
      const headingClasses = `font-bold text-gray-900 dark:text-white flex items-center gap-2 ${
        block.level === 2 ? 'text-xl sm:text-2xl mt-6 mb-4' : 'text-lg sm:text-xl mt-4 mb-3'
      }`;
      
      if (block.level === 2) {
        return (
          <h2 className={headingClasses}>
            {block.icon && <span>{block.icon}</span>}
            {block.content}
          </h2>
        );
      }
      return (
        <h3 className={headingClasses}>
          {block.icon && <span>{block.icon}</span>}
          {block.content}
        </h3>
      );

    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base ml-4">
          {block.items.map((item, idx) => (
            <li 
              key={idx}
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                {block.headers.map((header, idx) => (
                  <th 
                    key={idx} 
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIdx) => (
                <tr 
                  key={rowIdx}
                  className={rowIdx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
                >
                  {row.map((cell, cellIdx) => (
                    <td 
                      key={cellIdx}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                      dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'code':
      return (
        <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm my-3">
          <code>{block.content}</code>
        </pre>
      );

    case 'formula':
      return (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-3 sm:p-4 rounded-r-lg my-3">
          <p className="font-mono text-purple-900 dark:text-purple-300 font-semibold text-sm sm:text-base">
            💡 {block.content}
          </p>
        </div>
      );

    case 'highlight':
      const variantStyles = {
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
        tip: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100'
      };

      return (
        <div className={`border-2 p-3 sm:p-4 rounded-lg my-3 ${variantStyles[block.variant]}`}>
          <div 
            className="text-sm sm:text-base whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: block.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        </div>
      );

    case 'comparison':
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                  Слово
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                  ❌ Uncountable
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                  ✅ Countable
                </th>
              </tr>
            </thead>
            <tbody>
              {block.items.map((item, idx) => (
                <tr 
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
                >
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                    {item.label}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {item.uncountable}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    {item.countable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

interface RenderContentProps {
  content: string | ContentBlock[];
}

export const RenderContent: React.FC<RenderContentProps> = ({ content }) => {
  if (typeof content === 'string') {
    return (
      <p 
        className="text-gray-700 dark:text-gray-300 text-sm sm:text-base whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
      />
    );
  }

  return (
    <div className="space-y-3">
      {content.map((block, idx) => (
        <LessonContentBlock key={idx} block={block} />
      ))}
    </div>
  );
};
