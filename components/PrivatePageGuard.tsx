import useUser from "@/hooks/useUser";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivatePageGuardProps {
  children: React.ReactNode;
}

export const PrivatePageGuard = ({ children }: PrivatePageGuardProps) => {
  const router = useRouter();
  const { user, isError, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isError && !user?.login) {
      const redirectUrl = window.location.href;
      const params = new URLSearchParams({
        redirectUrl,
      });

      router.push(`/sign-in?${params}`);
      return;
    }
  }, [isLoading, isError, user?.login, router]);

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

  if (!user?.login) {
    return null;
  }

  return <>{children}</>;
};
