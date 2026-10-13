import { EmptyState } from "./EmptyState"
import type { ReadingBook } from "../types/readingBook"

type ReadingListProps = {
  books: ReadingBook[]
}

export function ReadingList({ books }: ReadingListProps) {
  return (
    <section className="reading-list">
      <div className="reading-list__header">
        <h2>Shelf</h2>
        <p>Books currently saved on the reading list.</p>
      </div>

      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="book-grid">
          {books.map((book) => (
            <li className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <dl className="book-card__meta">
                <div>
                  <dt>Author</dt>
                  <dd>{book.author}</dd>
                </div>
                <div>
                  <dt>Pages</dt>
                  <dd>{book.pages}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
