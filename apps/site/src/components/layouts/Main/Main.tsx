import React from "react"

export type MainProps = React.PropsWithChildren

export function Main({ children }: MainProps) {
  return <div>{children}</div>
}
