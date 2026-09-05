import { createContext, useState } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();
  const [actionLoading, setActionLoading] = useState(false);

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

  const createUser = async (email, password) => {
    setActionLoading(true);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0] || "ReSell Hub User",
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Registration failed"
        );
      }

      return {
        ...result.data,
        user: formatUser(result.data?.user),
      };
    } finally {
      setActionLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setActionLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Login failed"
        );
      }

      return {
        ...result.data,
        user: formatUser(result.data?.user),
      };
    } finally {
      setActionLoading(false);
    }
  };

  const googleSignIn = async () => {
    setActionLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Google sign in failed"
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
      const result = await authClient.signOut();

      if (result.error) {
        throw new Error(
          result.error.message || "Logout failed"
        );
      }

      localStorage.removeItem("access-token");

      return result.data;
    } finally {
      setActionLoading(false);
    }
  };

  const updateUser = async (userInfo) => {
    setActionLoading(true);

    try {
      const updateData = {};

      if (userInfo?.displayName !== undefined) {
        updateData.name = userInfo.displayName;
      }

      if (userInfo?.photoURL !== undefined) {
        updateData.image = userInfo.photoURL;
      }

      if (userInfo?.name !== undefined) {
        updateData.name = userInfo.name;
      }

      if (userInfo?.image !== undefined) {
        updateData.image = userInfo.image;
      }

      const result = await authClient.updateUser(updateData);

      if (result.error) {
        throw new Error(
          result.error.message || "Profile update failed"
        );
      }

      return result.data;
    } finally {
      setActionLoading(false);
    }
  };

  const authInfo = {
    user,
    loading: isPending || actionLoading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
