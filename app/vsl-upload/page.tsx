"use client"

import type React from "react"

import { useRef, useState } from "react"
import { upload } from "@vercel/blob/client"

export default function VslUploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [resultUrl, setResultUrl] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [copied, setCopied] = useState(false)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = inputRef.current?.files?.[0]
    if (!file) {
      setErrorMsg("Selecione um arquivo de vídeo primeiro.")
      setStatus("error")
      return
    }

    setStatus("uploading")
    setProgress(0)
    setErrorMsg("")

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/vsl-upload",
        onUploadProgress: (e) => setProgress(Math.round(e.percentage)),
      })
      setResultUrl(blob.url)
      setStatus("done")
    } catch (err) {
      console.error("[v0] upload failed:", err)
      setErrorMsg((err as Error).message || "Falha no upload.")
      setStatus("error")
    }
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(resultUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-foreground text-balance">Upload da VSL (4K)</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Envie o arquivo de vídeo original em 4K. Ele vai direto para o Vercel Blob, sem recompressão e sem perda de
          qualidade. Depois copie a URL gerada — vou usá-la no player do popup.
        </p>

        <form onSubmit={handleUpload} className="mt-6 flex flex-col gap-4">
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="block w-full cursor-pointer rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-foreground"
          />

          <button
            type="submit"
            disabled={status === "uploading"}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "uploading" ? `Enviando... ${progress}%` : "Enviar vídeo 4K"}
          </button>
        </form>

        {status === "uploading" && (
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {status === "error" && <p className="mt-4 text-sm font-medium text-destructive">{errorMsg}</p>}

        {status === "done" && (
          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-semibold text-foreground">Upload concluído.</p>
            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{resultUrl}</p>
            <button
              onClick={copyUrl}
              className="mt-3 inline-flex items-center justify-center rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {copied ? "Copiado!" : "Copiar URL"}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
