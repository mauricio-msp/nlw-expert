/* eslint-disable @typescript-eslint/no-explicit-any */

import Markdown from 'markdown-to-jsx'
import { CopyBlock, dracula } from 'react-code-blocks'

import { options } from '@/components/markdown/markdown-overrides'
import { getLanguageBlockCode } from '@/helpers/get-language-block-code'

export function MarkdownWrapper({ content }: { content: string }) {
  return (
    <div className="w-full">
      <Markdown
        options={{
          overrides: {
            ...options.overrides,
            pre: {
              component: ({ children }: { children: any }) => {
                const language = getLanguageBlockCode(content)
                return (
                  <CopyBlock
                    codeBlock
                    text={children.props.children}
                    theme={dracula}
                    language={language}
                    showLineNumbers={false}
                  />
                )
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
