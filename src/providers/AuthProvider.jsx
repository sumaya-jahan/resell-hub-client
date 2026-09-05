import { createContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const AuthProvider = ({ children }) => {
  const { data: session, isPending } =
    authClient.useSession();

  const [actionLoading, setActionLoading] =
    useState(false);

  const [bootstrapLoading, setBootstrapLoading] =
    useState(false);

  const formatUser = (authUser) => {
    if (!authUser) return null;

    return {
      ...authUser,
      uid: authUser.id,
      displayName: authUser.name || "",
      photoURL: authUser.image || "",
    };
  };

  const user = formatUser(session?.user);

  useEffect(() => {
    const bootstrapUser = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        localStorage.removeItem("access-token");
        setBootstrapLoading(false);
        return;
      }

      setBootstrapLoading(true);

      try {
        const jwtResponse = await fetch(
          `${API_URL}/jwt`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!jwtResponse.ok) {
          throw new Error(
            "Failed to create access token"
          );
        }

        const jwtData = await jwtResponse.json();

        localStorage.setItem(
          "access-token",
          jwtData.token
        );

        const userResponse = await fetch(
          `${API_URL}/users/${encodeURIComponent(
            session.user.email
          )}`,
          {
            headers: {
              authorization:
                `Bearer ${jwtData.token}`,
            },
            credentials: "include",
          }
        );

        if (userResponse.status === 404) {
          const pendingRole =
            localStorage.getItem(
              "pending-google-role"
            );

          const newUser = {
            name: session.user.name || "",
            email: session.user.email,
            photo: session.user.image || "",
            role:
              pendingRole === "seller"
                ? "seller"
                : "buyer",
          };

          const createResponse = await fetch(
            `${API_URL}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              credentials: "include",
              body: JSON.stringify(newUser),
            }
          );

          if (!createResponse.ok) {
            throw new Error(
              "Failed to sync Google user"
            );
          }
        }

        localStorage.removeItem(
          "pending-google-role"
        );
      } catch (error) {
        console.error(
          "Authentication bootstrap failed:",
          error
        );
      } finally {
        setBootstrapLoading(false);
      }
    };

    bootstrapUser();
  }, [
    session?.user?.email,
    session?.user?.name,
    session?.user?.image,
    isPending,
  ]);

  const createUser = async (
    email,
    password
  ) => {
    setActionLoading(true);

    try {
      const result =
        await authClient.signUp.email({
          email,
          password,
          name:
            email.split("@")[0] ||
            "ReSell Hub User",
        });

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Registration failed"
        );
      }

      return {
        ...result.data,
        user: formatUser(
          result.data?.user
        ),
      };
    } finally {
      setActionLoading(false);
    }
  };

  const signIn = async (
    email,
    password
  ) => {
    setActionLoading(true);

    try {
      const result =
        await authClient.signIn.email({
          email,
          password,
        });

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Login failed"
        );
      }

      return {
        ...result.data,
        user: formatUser(
          result.data?.user
        ),
      };
    } finally {
      setActionLoading(false);
    }
  };

  const googleSignIn = async () => {
    setActionLoading(true);

    try {
      const result =
        await authClient.signIn.social({
          provider: "google",
          callbackURL:
            window.location.origin,
        });

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Google sign in failed"
        );
      }

      return result.data;
    } finally {
      setActionLoading(false);
    }
  };

  const logOut = async () => {
    setActionLoading(true);

    try {
      const result =
        await authClient.signOut();

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Logout failed"
        );
      }

      localStorage.removeItem(
        "access-token"
      );

      localStorage.removeItem(
        "pending-google-role"
      );

      return result.data;
    } finally {
      setActionLoading(false);
    }
  };

  const updateUser = async (
    userInfo
  ) => {
    setActionLoading(true);

    try {
      const updateData = {};

      if (
        userInfo?.displayName !==
        undefined
      ) {
        updateData.name =
          userInfo.displayName;
      }

      if (
        userInfo?.photoURL !== undefined
      ) {
        updateData.image =
          userInfo.photoURL;
      }

      if (
        userInfo?.name !== undefined
      ) {
        updateData.name =
          userInfo.name;
      }

      if (
        userInfo?.image !== undefined
      ) {
        updateData.image =
          userInfo.image;
      }

      const result =
        await authClient.updateUser(
          updateData
        );

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Profile update failed"
        );
      }

      return result.data;
    } finally {
      setActionLoading(false);
    }
  };

  const authInfo = {
    user,
    loading:
      isPending ||
      actionLoading ||
      bootstrapLoading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider
      value={authInfo}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;