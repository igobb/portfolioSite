export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden>▸ </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
