import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React, { type ComponentProps } from 'react'
import CopyButton from './copy-button'
import { codeToHtml } from 'shiki'

const normalizeLang = (lang?: string) => {
  const lower = (lang || 'text').toString().toLowerCase()
  if (['js', 'jsx'].includes(lower)) return 'javascript'
  if (['ts', 'tsx'].includes(lower)) return 'typescript'
  if (['shell', 'sh', 'bash'].includes(lower)) return 'bash'
  if (['yml'].includes(lower)) return 'yaml'
  return lower
}

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage({
  alt,
  width,
  height,
  src,
  ...rest
}: ComponentProps<typeof Image>) {
  const fallbackAlt: string =
    alt ??
    (typeof src === 'string'
      ? src.split('/').pop()?.split('.')[0] ?? '博客配图'
      : '博客配图')

  return (
    <Image
      src={src}
      alt={fallbackAlt}
      width={width ?? 1200}
      height={height ?? 675}
      className="rounded-lg mx-auto! my-8!"
      {...rest}
    />
  )
}

async function Pre({ children, ...props }) {
  const code = React.Children.toArray(children)[0] as any
  const raw =
    code?.props?.__rawString__ ||
    (Array.isArray(code?.props?.children)
      ? code.props.children.join('')
      : code?.props?.children || '')
  const lang =
    code?.props?.['data-language'] ||
    code?.props?.className?.replace('language-', '') ||
    'text'

  const normalizedLang = normalizeLang(lang)

  const tagWithTheme = (html: string, theme: 'light' | 'dark') =>
    html.replace('<pre class="', `<pre data-theme="${theme}" class="`)

  let htmlLight: string
  let htmlDark: string
  try {
    htmlLight = await codeToHtml(raw, {
      lang: normalizedLang,
      theme: 'github-light-default',
    })
    htmlDark = await codeToHtml(raw, {
      lang: normalizedLang,
      theme: 'github-dark-default',
    })
  } catch (err) {
    const fallback = `<pre><code>${escapeHtml(raw)}</code></pre>`
    htmlLight = fallback
    htmlDark = fallback
    console.error('Code highlight failed', err)
  }

  return (
    <div className="code-block group">
      <div className="code-block__top">
        <span className="code-block__lang">{normalizedLang.toUpperCase()}</span>
        <CopyButton value={raw} />
      </div>
      <div
        className="code-block__body"
        dangerouslySetInnerHTML={{
          __html:
            tagWithTheme(htmlLight, 'light') + tagWithTheme(htmlDark, 'dark'),
        }}
        {...props}
      />
    </div>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  Table,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
