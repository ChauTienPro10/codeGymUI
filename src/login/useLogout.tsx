import { useState } from "react"
import { useGenHeader } from "../use_features/useGenHeader" 

const SERVER_URL = window._env_?.APP_SERVER_URL;

type LogoutResult = {
  error: string | null
}

export const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { getHeader } = useGenHeader();

  const logout = async (): Promise<LogoutResult> => {
    setLoading(true)

    try {
      const response = await fetch(`${SERVER_URL}/auth/logout`, {
        method: "POST",
        headers: getHeader(),
      })

      const result = await response.json()
      console.log(result.code)

      if (result.code != 200) {
        const message = result?.message || "Logout failed"
        return { error: message }
      }

      localStorage.removeItem("token")
      localStorage.removeItem("user")
      console.log("err null")


      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return { logout, loading }
}