"use client";

import useUser from "@/hooks/useUser";
// import DraftsIcon from "@mui/icons-material/Drafts";
import RecommendIcon from "@mui/icons-material/Recommend";
import ArticleIcon from "@mui/icons-material/Article";
import { ListItemButton, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useRouter } from "@/hooks/useNavRouter";
import getAvatarUrl from "../common/getAvatarUrl";

export default function AlignItemsList() {
  const router = useRouter();

  const { user } = useUser();

  return (
    <PrivatePageGuard>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
          alignItems="flex-start"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <ListItemAvatar>
            <Avatar alt={user?.name} src={getAvatarUrl(user?.avatarImg)} />
          </ListItemAvatar>
          <ListItemText
            primary={user?.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  @{user?.login}
                </Typography>
                {user?.bio}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push("/you/post");
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Content" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push(`/recommend/edit`);
            }}
          >
            <ListItemIcon>
              <RecommendIcon />
            </ListItemIcon>
            <ListItemText primary="Recommend" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </PrivatePageGuard>
  );
}
