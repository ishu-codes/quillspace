import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

// import App from "./App";
import LandingPage from "@/components/LandingPage";
import NotFound from "@/components/NotFound";
import {
    AuthLayout,
    Login,
    Logout,
    ProtectedLayout,
    Register,
    sessionLoader,
} from "@/components/auth";
import {
    DashboardLayout,
    Home,
    Library,
    Profile,
    Settings,
} from "@/components/dashboard";
import { Draft, DraftLayout } from "@/components/drafts";
import {
    Bookmarked,
    Drafts,
    LibraryLayout,
    List,
    Published,
} from "./components/library";
import { Post, PostLayout } from "./components/posts";
import { ProfileLayout, ProfilePage } from "./components/profile";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<LandingPage />} />

            {/* Auth routes */}
            <Route path="/auth" element={<AuthLayout />} loader={sessionLoader}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Auth-protected Routes */}
            <Route
                path="/"
                element={<ProtectedLayout />}
                loader={sessionLoader}
            >
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
                    <Route
                        index
                        element={<Navigate to="/dashboard/library" />}
                    />
                    <Route path="posts" element={<Published />} />
                    <Route path="drafts" element={<Drafts />} />
                    <Route path="bookmarked" element={<Bookmarked />} />
                </Route>

                {/* Lists */}
                <Route path="lists/:listId" element={<List />} />

                {/* Drafts */}
                <Route path="drafts" element={<DraftLayout />}>
                    <Route
                        index
                        element={<Navigate to="/dashboard/library/drafts" />}
                    />
                    <Route path=":draftId" element={<Draft />} />
                </Route>

                {/* Posts */}
                <Route path="posts" element={<PostLayout />}>
                    <Route index element={<Navigate to="/dashboard/home" />} />
                    <Route path=":postId" element={<Post />} />
                </Route>

                {/* User Profiles */}
                <Route path="users" element={<ProfileLayout />}>
                    <Route index element={<Navigate to="/dashboard/home" />} />
                    <Route path=":userId" element={<ProfilePage />} />
                </Route>

                {/* Logout */}
                <Route path="/auth/logout" element={<Logout />} />
            </Route>

            {/* Not-found */}
            <Route path="*" element={<NotFound />} />
        </>,
    ),
);
