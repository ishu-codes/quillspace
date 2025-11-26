import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";

// import App from "./App";
import LandingPage from "@/components";
import { AuthLayout, Login, Register, ProtectedLayout, sessionLoader, Logout } from "@/components/auth";
import { Home, Library, Profile, Settings, DashboardLayout } from "@/components/dashboard";
import { Draft, DraftLayout } from "@/components/drafts";
import NotFound from "@/components/NotFound";
import { PostLayout, Post } from "./components/posts";
import { Bookmarked, List, Published, Drafts, LibraryLayout } from "./components/library";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes */}
      <Route path="/auth" element={<AuthLayout title="Auth" subtitle="subtitle" />} loader={sessionLoader}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Auth-protected Routes */}
      <Route path="/" element={<ProtectedLayout />} loader={sessionLoader}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="library">
            <Route index element={<Library />} />
            <Route path="drafts" element={<Drafts />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Library */}
        <Route path="library" element={<LibraryLayout />}>
          <Route index element={<Navigate to="/dashboard/library" />} />
          <Route path="posts" element={<Published />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="bookmarked" element={<Bookmarked />} />
        </Route>

        {/* Lists */}
        <Route path="lists/:listId" element={<List />} />

        {/* Drafts */}
        <Route path="drafts" element={<DraftLayout />}>
          <Route index element={<Navigate to="/dashboard/library/drafts" />} />
          <Route path=":draftId" element={<Draft />} />
        </Route>

        {/* Posts */}
        <Route path="posts" element={<PostLayout />}>
          <Route index element={<Navigate to="/dashboard/home" />} />
          <Route path=":postId" element={<Post />} />
        </Route>

        {/* Logout */}
        <Route path="/auth/logout" element={<Logout />} />
      </Route>

      {/* Not-found */}
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);
