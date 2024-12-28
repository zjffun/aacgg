import useUser from "@/hooks/useUser";
import { CircularProgress, Button } from "@mui/material";
import openGithubSignIn from "@/utils/openGithubSignIn";

interface PrivatePageGuardProps {
  children: React.ReactNode;
}

export const PrivatePageGuard = ({ children }: PrivatePageGuardProps) => {
  const { user, isError, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load user data</div>;
  }

  if (!user?.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg">Please log in to view this content</p>
        <Button
          onClick={() => {
            openGithubSignIn();
          }}
        >
          login
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
