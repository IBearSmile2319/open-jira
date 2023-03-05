import { UIContext } from "@/context/ui";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material";
import { useContext } from "react";

const menuItems: string[] = ["Inbox", "Starred", "Send email", "Drafts"];
const Sidebar = () => {
  const {
    sideMenuOpen,
    closeSideMenu
  } = useContext(UIContext)
  return (
    <Drawer
      anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box
          sx={{
            padding: "5px 10px",
          }}
        >
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}</ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
