import {
    BellIcon,
    EyeIcon,
    FingerprintIcon,
    GlobeIcon,
    LogOutIcon,
    type LucideProps,
    MailIcon,
    MonitorIcon,
    MoonIcon,
    RefreshCcwIcon,
    SaveIcon,
    SunIcon,
    UploadIcon,
    UserMinusIcon,
    XIcon,
} from "lucide-react";
import {
    type ForwardRefExoticComponent,
    type RefAttributes,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthSession } from "@/hooks/useAuthSession";
import { authClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";

interface UserSettings {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    website?: string;
    location?: string;
}

interface ActionItemInterface {
    title: string;
    desc: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    action: {
        title: string;
        key: string;
        type?: "destructive" | "mildDestructive";
    };
}

const NOTIFICATIONS: ActionItemInterface[] = [
    {
        title: "Email notifications",
        desc: "Receive updates via email",
        icon: MailIcon,
        action: {
            title: "",
            key: "email",
        },
    },
    {
        title: "Comments on your posts",
        desc: "Get notified when someone comments",
        icon: BellIcon,
        action: {
            title: "",
            key: "comments",
        },
    },
    {
        title: "New followers",
        desc: "Know when someone follows you",
        icon: EyeIcon,
        action: {
            title: "",
            key: "followers",
        },
    },
    {
        title: "Digest",
        desc: "Get a weekly summary of activity",
        icon: BellIcon,
        action: {
            title: "",
            key: "digest",
        },
    },
];

const PRIVACY_ACTION: ActionItemInterface[] = [
    {
        title: "Change Password",
        desc: "Update your password regularly for security",
        icon: RefreshCcwIcon,
        action: {
            title: "Update Password",
            key: "password",
        },
    },
    {
        title: "Two-Factor Authentication",
        desc: "Add an extra layer of security",
        icon: FingerprintIcon,
        action: {
            title: "Enable 2FA",
            key: "2fa",
        },
    },
    {
        title: "Logout",
        desc: "Sign out from all devices",
        icon: LogOutIcon,
        action: {
            title: "Logout",
            key: "logout",
            type: "mildDestructive",
        },
    },
    {
        title: "Delete Account",
        desc: "Permanently delete your account and all data",
        icon: UserMinusIcon,
        action: {
            title: "Delete Account",
            key: "deleteAccount",
            type: "destructive",
        },
    },
];

const PRIVACY_SWITCH: ActionItemInterface[] = [
    {
        title: "Public Profile",
        desc: "Allow others to see your profile",
        icon: GlobeIcon,
        action: {
            title: "",
            key: "public",
        },
    },
    {
        title: "Show Email Address",
        desc: "Display email on your profile",
        icon: MailIcon,
        action: {
            title: "",
            key: "showEmail",
        },
    },
];

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { session } = useAuthSession();
    const [userSettings, setUserSettings] = useState<UserSettings>({
        name: session?.user.name ?? "John Doe",
        email: session?.user.email ?? "",
        bio: "Full-stack developer and tech writer",
        avatar: session?.user.image ?? "",
        website: `https://${session?.user.id ?? "john"}.dev`,
        location: "Delhi, India",
    });

    const [notifications, setNotifications] = useState<{
        [name: string]: boolean;
    }>({
        email: true,
        comments: false,
        followers: true,
        digest: true,
        public: true,
        showEmail: true,
    });
    const handleNotificationToggle = (key: string) => {
        setNotifications((state) => ({ ...state, [key]: !state[key] }));
    };

    const handleUpdate = (key: string) => {
        // console.log(`Action ${key} initiated!`);
        switch (key) {
            case "logout":
                handleLogout();
                break;
        }
    };

    const navigate = useNavigate();

    const [editedSettings, setEditedSettings] =
        useState<UserSettings>(userSettings);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setEditedSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setEditedSettings((prev) => ({
                    ...prev,
                    avatar: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUserSettings(editedSettings);
        setIsLoading(false);
    };

    const handleCancel = () => {
        setEditedSettings(userSettings);
        setPreviewImage(null);
    };

    const handleLogout = async () => {
        await authClient.signOut();
        navigate("/auth/login");
    };

    useEffect(() => {
        setUserSettings({
            name: session?.user.name ?? "John Doe",
            email: session?.user.email ?? "",
            bio: "Full-stack developer and tech writer",
            avatar: session?.user.image ?? "",
            website: `https://${session?.user.id ?? "john"}.dev`,
            location: "Delhi, India",
        });
    }, []);

    return (
        <div className="h-full py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="text-lg text-muted-foreground mt-2 font-medium">
                        Personalize your writing space and account preferences.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="w-full h-auto p-0 bg-transparent border-b border-border mb-12 flex justify-start gap-8 rounded-none">
                        <TabsTrigger
                            value="profile"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="appearance"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Appearance
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="privacy"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-widest"
                        >
                            Privacy
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent
                        value="profile"
                        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid gap-12">
                            <section className="space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-8">
                                    <Avatar className="h-32 w-32 ring-4 ring-border/50">
                                        <AvatarImage
                                            src={
                                                previewImage ||
                                                editedSettings.avatar
                                            }
                                            alt={editedSettings.name}
                                        />
                                        <AvatarFallback className="text-3xl font-serif font-bold">
                                            {editedSettings.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-serif font-bold">
                                            Profile Picture
                                        </h3>
                                        <div className="flex gap-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="avatar-upload"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="rounded-full px-5 cursor-pointer"
                                            >
                                                <span>
                                                    <UploadIcon className="mr-2 h-4 w-4" />
                                                    Upload
                                                </span>
                                            </Button>
                                            {previewImage && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-full px-5"
                                                    onClick={() => {
                                                        setPreviewImage(null);
                                                        setEditedSettings(
                                                            (prev) => ({
                                                                ...prev,
                                                                avatar: userSettings.avatar,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    <XIcon className="mr-2 h-4 w-4" />
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            Recommended: Square image, at least
                                            400x400px.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <Separator className="opacity-50" />

                            <section className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                        value={editedSettings.name}
                                        onChange={handleInputChange}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                        value={editedSettings.email}
                                        onChange={handleInputChange}
                                        placeholder="hello@example.com"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label
                                        htmlFor="bio"
                                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        Short Biography
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={4}
                                        value={editedSettings.bio}
                                        onChange={handleInputChange}
                                        placeholder="Tell the world your story..."
                                        className="flex w-full rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="website"
                                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        Website
                                    </label>
                                    <Input
                                        id="website"
                                        name="website"
                                        type="url"
                                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                        value={editedSettings.website}
                                        onChange={handleInputChange}
                                        placeholder="https://yoursite.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="location"
                                        className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                                    >
                                        Location
                                    </label>
                                    <Input
                                        id="location"
                                        name="location"
                                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                        value={editedSettings.location}
                                        onChange={handleInputChange}
                                        placeholder="City, Country"
                                    />
                                </div>
                            </section>

                            <div className="flex gap-4 pt-6">
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={isLoading}
                                    className="rounded-full px-8 h-12 font-bold shadow-lg shadow-foreground/10 transition-all active:scale-95"
                                >
                                    {isLoading ? (
                                        <RefreshCcwIcon className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <SaveIcon className="mr-2 h-4 w-4" />
                                    )}
                                    Save Changes
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="rounded-full px-8 h-12 font-bold transition-all"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent
                        value="appearance"
                        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "system",
                                    desc: "Device default",
                                    icon: MonitorIcon,
                                },
                                {
                                    name: "light",
                                    desc: "Clean & bright",
                                    icon: SunIcon,
                                },
                                {
                                    name: "dark",
                                    desc: "Night mode",
                                    icon: MoonIcon,
                                },
                            ].map((th) => (
                                <button
                                    type="button"
                                    key={th.name}
                                    onClick={() =>
                                        setTheme(th.name as typeof theme)
                                    }
                                    className={cn(
                                        "flex flex-col items-start gap-4 p-6 rounded-[2rem] border-2 transition-all group relative overflow-hidden",
                                        theme === th.name
                                            ? "border-foreground bg-foreground text-background shadow-xl"
                                            : "border-border/50 bg-muted/20 hover:border-foreground/20",
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                            theme === th.name
                                                ? "bg-background text-foreground"
                                                : "bg-muted text-muted-foreground group-hover:text-foreground",
                                        )}
                                    >
                                        <th.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-xl capitalize">
                                            {th.name}
                                        </h3>
                                        <p
                                            className={cn(
                                                "text-sm font-medium",
                                                theme === th.name
                                                    ? "text-background/70"
                                                    : "text-muted-foreground",
                                            )}
                                        >
                                            {th.desc}
                                        </p>
                                    </div>
                                    {theme === th.name && (
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-background rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent
                        value="notifications"
                        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <Card className="rounded-[2.5rem] border-border/50 shadow-2xl shadow-foreground/5 p-4">
                            <CardContent className="space-y-8 pt-6">
                                {NOTIFICATIONS.map((item) => (
                                    <SwitchOption
                                        key={item.title}
                                        item={item}
                                        data={notifications}
                                        action={handleNotificationToggle}
                                    />
                                ))}

                                <div className="pt-4">
                                    <Button className="rounded-full px-8 h-12 font-bold shadow-lg shadow-foreground/10">
                                        Save Preferences
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent
                        value="privacy"
                        className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    >
                        <div className="grid gap-8">
                            <Card className="rounded-[2.5rem] border-border/50 shadow-2xl shadow-foreground/5 overflow-hidden">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="font-serif text-2xl">
                                        Profile Visibility
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        Control who can discover and see your
                                        information.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 space-y-8">
                                    {PRIVACY_SWITCH.map((item) => (
                                        <SwitchOption
                                            item={item}
                                            key={item.title}
                                            data={notifications}
                                            action={handleNotificationToggle}
                                        />
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="rounded-[2.5rem] border-border/50 shadow-2xl shadow-foreground/5 overflow-hidden">
                                <CardHeader className="px-8 pt-8 text-destructive">
                                    <CardTitle className="font-serif text-2xl">
                                        Danger Zone
                                    </CardTitle>
                                    <CardDescription className="text-base text-destructive/80">
                                        Irreversible actions for your account.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 space-y-6">
                                    {PRIVACY_ACTION.slice(2, 5).map((item) => (
                                        <ActionOption
                                            key={item.title}
                                            item={item}
                                            action={handleUpdate}
                                        />
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function ActionOption({
    item,
    action,
}: { item: ActionItemInterface; action: (key: string) => void }) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 py-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 border border-border/50">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-bold text-lg leading-tight">
                        {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                        {item.desc}
                    </p>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={
                            item.action.type === "destructive"
                                ? "destructive"
                                : "outline"
                        }
                        className={cn(
                            "rounded-full px-6 font-bold min-w-[140px]",
                            item.action.type === "mildDestructive"
                                ? "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                                : "",
                        )}
                    >
                        {item.action.title}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-3xl font-serif font-bold">
                            Confirm Action
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Are you sure you want to {item.title.toLowerCase()}?{" "}
                            {item.desc}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-8 flex gap-3">
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                className="rounded-full px-6 font-bold flex-1 h-12"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant={
                                item.action.type === "destructive"
                                    ? "destructive"
                                    : "default"
                            }
                            onClick={() => action(item.action.key)}
                            className="rounded-full px-6 font-bold flex-1 h-12 shadow-lg"
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function SwitchOption({
    item,
    action,
    data,
}: {
    item: ActionItemInterface;
    data: { [name: string]: boolean };
    action: (key: string) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 border border-border/50">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-bold text-lg leading-tight">
                        {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                        {item.desc}
                    </p>
                </div>
            </div>
            <Switch
                className="data-[state=checked]:bg-foreground"
                checked={data[item.action.key]}
                onCheckedChange={() => action(item.action.key)}
            />
        </div>
    );
}
