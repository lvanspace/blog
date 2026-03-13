'use client'

import { useState } from 'react'

type Props = {
  value: string
}

export default function CopyButton({ value }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="code-block__copy"
      aria-label="Copy code"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
