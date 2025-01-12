import React from "react"

export type ClientProps = React.PropsWithChildren

export function Client({ children }: ClientProps) {
  return <div>{children}</div>
}
