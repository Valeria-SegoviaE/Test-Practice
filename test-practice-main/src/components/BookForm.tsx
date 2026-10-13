import type { RefObject } from "react"
import type { useReadingList } from "../hooks/useReadingList"

type BookFormProps = {
  formState: { message: string }
  isPending: boolean
  submitBook: ReturnType<typeof useReadingList>["submitBook"]
  titleInputRef: RefObject<HTMLInputElement | null>
}

export function BookForm({
  formState,
  isPending,
  submitBook,
  titleInputRef,
}: BookFormProps) {
  return (
    <form className="book-form" action={submitBook}>
      <div className="book-form__intro">
        <h2>New book</h2>
        <p>Complete the fields to add a book to the reading list.</p>
        {formState.message && <p aria-live="polite">{formState.message}</p>}
      </div>

      <div className="book-form__fields">
        <div className="field">
          <label htmlFor="book-title">Title</label>
          <input
            id="book-title"
            name="title"
            type="text"
            placeholder="Project Hail Mary"
            ref={titleInputRef}
          />
        </div>

        <div className="field">
          <label htmlFor="book-author">Author</label>
          <input
            id="book-author"
            name="author"
            type="text"
            placeholder="Andy Weir"
          />
        </div>

        <div className="field">
          <label htmlFor="book-pages">Pages</label>
          <input
            id="book-pages"
            name="pages"
            type="number"
            min="1"
            step="1"
            placeholder="496"
          />
        </div>
      </div>

      <button className="button" type="submit" disabled={isPending}>
        Add book
      </button>
    </form>
  )
}
