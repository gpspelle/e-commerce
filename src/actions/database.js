import axios from "axios"
import { ACCOUNTS_ENDPOINT, REST_API } from "../constants/constants"

export const getAccountsFromDatabase = async ({ setAccounts, productOwnerIds }) => {
  if (productOwnerIds !== undefined && Array.isArray(productOwnerIds)) {
    const body = {
      productOwnerIds,
    }

    if (productOwnerIds.length === 0) {
      return
    }

    const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
      params: body,
    })

    setAccounts(response.data)
  } else {
    const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`)
    setAccounts(response.data)
  }
}
