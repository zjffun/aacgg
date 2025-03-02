"use client";

import getAvatarUrl from "@/app/common/getAvatarUrl";
import GoBackAppBar from "@/app/components/GoBackAppBar";
import { showToast } from "@/app/components/Toast";
import { PrivatePageGuard } from "@/components/PrivatePageGuard";
import { useRouter } from "@/hooks/useNavRouter";
import useUser from "@/hooks/useUser";
import { updateUserInfo } from "@/services/user";
import { Camera } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const router = useRouter();
  const { user, isError, isLoading } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [login, setLogin] = useState(user?.login || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarImg, setAvatarImg] = useState(user?.avatarImg || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email || "");
    setLogin(user?.login);
    setBio(user?.bio || "");
    setAvatarImg(user?.avatarImg || "");
  }, [user]);

  if (isError) {
    return <div>failed to load</div>;
  }

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateUserInfo({
        name,
        email,
        login,
        bio,
        avatarImg,
      });

      showToast("Update user info success.");
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivatePageGuard>
      <GoBackAppBar title="Edit Profile"></GoBackAppBar>
      <Box sx={{ padding: 2 }}>
        <Box
          position="relative"
          sx={{
            margin: "0 auto",
            width: "min-content",
          }}
        >
          <Avatar
            sx={{
              width: "8rem",
              height: "8rem",
            }}
            alt={user?.name}
            src={getAvatarUrl(user?.avatarImg)}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
            }}
          >
            <Camera />
          </IconButton>
        </Box>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Login Name"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PrivatePageGuard>
  );
}
