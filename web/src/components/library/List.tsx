import { useParams } from "react-router-dom"

export default function List() {
  const { listId } = useParams();
  return (
    <div className="">ListId: { listId }</div>
  )
}
