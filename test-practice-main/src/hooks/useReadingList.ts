import { useActionState, useRef, useState } from "react"
import type { ReadingBook } from "../types/readingBook"

type FormState = {
  message: string
}

const initialBooks: ReadingBook[] = [
  { id: "project-hail-mary", title: "Project Hail Mary", author: "Andy Weir", pages: 496 },
  { id: "circe", title: "Circe", author: "Madeline Miller", pages: 393 },
  { id: "midnight-library", title: "The Midnight Library", author: "Matt Haig", pages: 304 },
]

export function useReadingList() {
  const [books, setBooks] = useState(initialBooks)
  const titleInputRef = useRef<HTMLInputElement>(null)

  function focusTitleInput() {
    titleInputRef.current?.focus()
  }

  async function addBook(_previousState: FormState, formData: FormData): Promise<FormState> {
    try {
      const title = String(formData.get("title") ?? "").trim()
      const author = String(formData.get("author") ?? "").trim()
      const pages = Number(formData.get("pages"))

      if (!title) {
        return { message: "Please enter a book title." }
      }

      if (!author) {
        return { message: "Please enter the author's name." }
      }

      if (!Number.isInteger(pages) || pages <= 0) {
        return { message: "Pages must be a whole number greater than 0." }
      }

      setBooks((currentBooks) => [
        ...currentBooks,
        { id: crypto.randomUUID(), title, author, pages },
      ])
      return { message: `Added "${title}" to your reading list.` }
    } finally {
      focusTitleInput()
    }
  }

  const [formState, submitBook, isPending] = useActionState(addBook, {
    message: "",
  })

  return { books, formState, submitBook, isPending, titleInputRef }
}