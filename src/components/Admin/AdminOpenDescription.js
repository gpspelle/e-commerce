import { ADMIN_DESCRIPTION } from "../../constants/constants"
import { useHistory } from "react-router-dom"

const openAdminDetailPage = (event, history, account) => {
  if (event.target.type === "button") return

  history.push({
    pathname: `/${account.id}/${ADMIN_DESCRIPTION}`,
    state: account,
  })
}

function AdminOpenDescription({ account }) {
  const history = useHistory()

  return (e) => openAdminDetailPage(e, history, account)
}

export default AdminOpenDescription
