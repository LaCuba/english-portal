import { __ } from "@/helpers"
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import { green } from "@mui/material/colors"
import React from "react"

export type MenuItem = {
  label: string
  onClick: () => void
}

export type Props = {
  items: MenuItem[]
}

export function AvatarMenu({ items }: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>N</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {__.map(items, (item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            <Typography sx={{ textAlign: "center" }}>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
