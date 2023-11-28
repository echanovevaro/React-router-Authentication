import { Outlet, useSubmit } from "react-router-dom"
import React, { useEffect } from "react"

import MainNavigation from "../components/MainNavigation"

import { getTokenDuration, getUserToken } from "../utils/auth"

function RootLayout() {
  const submit = useSubmit()
  const token = getUserToken()

  useEffect(() => {
    if (!token) {
      return
    }
    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" })
      return
    }
    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)

    setTimeout(() => {
      if (tokenDuration) submit(null, { method: "post", action: "/logout" })
    }, tokenDuration)
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
