import copy from 'copy-to-clipboard'
import { useCallback, useEffect, useState } from 'react'

export default function useClipboard(value, timeout = 1500) {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = useCallback(() => {
    copy(value)
    setIsCopied(true)
  }, [value])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isCopied, timeout])

  return { onCopy, isCopied }
}
