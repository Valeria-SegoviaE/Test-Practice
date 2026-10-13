# Práctica: lista de lectura

Tiempo: **1 hora**.

La pantalla ya está armada con `src/design-system.css`. Los componentes solo muestran información estática: no tienen estado ni props. Tu trabajo es conectar ese layout con el estado de React.

## Objetivo

Permitir que una persona agregue un libro desde el formulario y lo vea en el estante.

Toda la lógica de estado va en un solo custom hook: `src/hooks/useReadingList.ts`. Llámalo **una sola vez** desde `App` y pasa los valores a `BookForm` y `ReadingList`.

## Qué implementar

1. `**useState**` — Mueve los tres libros de ejemplo al estado inicial del hook. Renderiza el estante desde esa lista. Si la lista queda vacía, muestra `EmptyState` en lugar del grid.
2. `**useActionState**` — Envía el formulario con este hook. Lee `title`, `author` y `pages` desde `FormData`.
  - Rechaza un título vacío, un autor vacío, o un número de páginas que no sea un entero mayor que 0.
  - Si falla, la lista no cambia y el párrafo del formulario muestra el error.
  - Si funciona, agrega el libro, muestra una confirmación breve y deja que React limpie los campos no controlados.
  - Mientras la acción está pendiente, desactiva el botón. La clase `button` ya estiliza `:disabled`.
  - Quita el `preventDefault` temporal de `BookForm` y usa `action={submitBook}`.
3. `**useRef**` — Cuando la acción termina, con éxito o con error, enfoca el input del título. Crea la ref dentro del custom hook y asígnala al input en `BookForm`.

## Ejemplo de `useRef`

La ref se crea en el hook. El componente solo la recibe y la asigna al input.

```tsx
import { useRef, type RefObject } from "react"

export function useReadingList() {
  const titleInputRef = useRef<HTMLInputElement>(null)

  function focusTitleInput() {
    titleInputRef.current?.focus()
  }

  return { titleInputRef, focusTitleInput }
}

type BookFormProps = {
  titleInputRef: RefObject<HTMLInputElement | null>
  onFocusTitle: () => void
}

export function BookForm({ titleInputRef, onFocusTitle }: BookFormProps) {
  return (
    <form>
      <input ref={titleInputRef} id="book-title" name="title" type="text" />
      <button type="button" onClick={onFocusTitle}>
        Focus title
      </button>
    </form>
  )
}
```

`App` llama al hook y pasa `titleInputRef` y `focusTitleInput` a `BookForm`. El botón extra solo muestra la conexión. En esta práctica, llama a `focusTitleInput()` cuando termina la acción del formulario.

## Forma del hook

```tsx
const [books, setBooks] = useState(initialBooks)

const [formState, submitBook, isPending] = useActionState(addBook, {
  message: "",
})

const titleInputRef = useRef<HTMLInputElement>(null)
```

`addBook` puede llamar a `setBooks` cuando los campos son válidos. Devuelve `{ message }` para que el formulario pinte `formState.message`.

## Terminado cuando

- Los tres libros de ejemplo salen del estado y un libro válido nuevo aparece en el grid.
- Un envío inválido muestra un mensaje y no agrega una tarjeta.
- El input del título recibe el foco después de cada envío.
- `useState`, `useActionState` y `useRef` viven solo en `useReadingList`.

