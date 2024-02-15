/* eslint-disable @typescript-eslint/no-explicit-any */

export const options = {
  overrides: {
    h1: {
      component: ({ children }: { children: any }) => (
        <h1 className="mb-4 text-4xl font-bold">{children}</h1>
      ),
    },
    h2: {
      component: ({ children }: { children: any }) => (
        <h2 className="mb-4 text-3xl font-bold">{children}</h2>
      ),
    },
    h3: {
      component: ({ children }: { children: any }) => (
        <h3 className="mb-4 text-2xl font-bold">{children}</h3>
      ),
    },
    h4: {
      component: ({ children }: { children: any }) => (
        <h4 className="mb-4 text-xl font-bold">{children}</h4>
      ),
    },
    h5: {
      component: ({ children }: { children: any }) => (
        <h5 className="mb-4 text-lg font-bold">{children}</h5>
      ),
    },
    h6: {
      component: ({ children }: { children: any }) => (
        <h6 className="mb-4 text-base font-bold">{children}</h6>
      ),
    },
    blockquote: {
      component: ({ children }: { children: any }) => (
        <blockquote className="my-4 border-l-4 border-gray-400 pl-4 italic">
          {children}
        </blockquote>
      ),
    },
    ul: {
      component: ({ children }: { children: any }) => (
        <ul className="my-4 list-disc pl-8">{children}</ul>
      ),
    },
    ol: {
      component: ({ children }: { children: any }) => (
        <ol className="my-4 list-decimal pl-8">{children}</ol>
      ),
    },
    a: {
      component: ({ children }: { children: any }) => (
        <a className="text-blue-600 hover:underline">{children}</a>
      ),
    },
    code: {
      component: ({ children }: { children: any }) => (
        <code className="rounded-md bg-accent px-2 text-foreground">
          {children}
        </code>
      ),
    },
    hr: {
      component: () => <hr className="my-4 text-muted" />,
    },
  },
}
