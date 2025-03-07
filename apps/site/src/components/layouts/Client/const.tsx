import { Chat } from "@mui/icons-material"
import FolderIcon from "@mui/icons-material/Folder"

export const SIDEBAR_NAV_LINKS = [
  {
    id: 1,
    label: "Профиль",
    icon:   <FolderIcon />,
    to: "/client/profile",
  },
  {
    id: 2,
    label: "Чат",
    icon:   <Chat />,
    to: "/client/chat",
  },
]
