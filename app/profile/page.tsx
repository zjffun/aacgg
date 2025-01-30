"use client";

import useUser from "@/hooks/useUser";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Fab,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import getAvatarUrl from "../common/getAvatarUrl";
import GoBackAppBar from "../components/GoBackAppBar";

const UserProfile = () => {
  const router = useRouter();
  const { user, isError, isLoading } = useUser();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>failed to load</div>;
  }

  return (
    <div>
      <GoBackAppBar title="Edit Profile"></GoBackAppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid>
            <Box display="flex" alignItems="center" gap={4}>
              <Avatar
                sx={{
                  width: "8rem",
                  height: "8rem",
                }}
                alt={user?.name}
                src={getAvatarUrl(user?.avatarImg)}
              />
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h4" component="h1">
                    {user?.name}
                  </Typography>
                </Box>
                <Typography variant="h6" color="textSecondary">
                  @{user?.login} {user?.bio}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box
          position="fixed"
          bottom={"calc(16px + var(--navigation-height))"}
          right={16}
        >
          <Fab
            color="primary"
            onClick={() => {
              router.push("/profile/edit");
            }}
          >
            <Edit />
          </Fab>
        </Box>
      </Container>
    </div>
  );
};

export default UserProfile;
