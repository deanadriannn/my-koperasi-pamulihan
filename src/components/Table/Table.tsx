import "./Table.css"

const Table = ({
  columns,
  children
}: {
  columns: string[]
  children: React.ReactNode
}) => {
  return (
    <table className="table__table">
      <thead>
        <tr>
          {columns.map(column => (
            <th className="table__th">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default Table