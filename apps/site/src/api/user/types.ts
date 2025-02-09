export type Profile = {
  id: number
  name: string
  email: string
}
export type ResponseUser = {
  user: Profile
}

export type User = {
  id: number
  name: string
}

export type ResponseGetUsers = {
  users: User[]
}
