import { useState, type ForwardRefExoticComponent, type RefAttributes } from "react";
import {
	SaveIcon,
	UploadIcon,
	XIcon,
	MailIcon,
	BellIcon,
	EyeIcon,
	SunIcon,
	MoonIcon,
	MonitorIcon,
	LogOutIcon,
	GlobeIcon,
	FingerprintIcon,
	RefreshCcwIcon,
	UserMinusIcon,
	type LucideProps,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
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
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
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
	const [userSettings, setUserSettings] = useState<UserSettings>({
		name: "John Doe",
		email: "john@example.com",
		bio: "Full-stack developer and tech writer",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
		website: "https://john.com",
		location: "Delhi, India",
	});

	const [notifications, setNotifications] = useState<{ [name: string]: boolean }>({
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
		console.log(`Action ${key} initiated!`);
	};

	const [editedSettings, setEditedSettings] = useState<UserSettings>(userSettings);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

	return (
		<div className="h-full py-8">
			<div className="max-w-4xl mx-auto px-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold">Settings</h1>
					<p className="text-muted-foreground mt-2">Manage your account preferences and settings</p>
				</div>

				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="w-full flex justify-between md:grid md:grid-cols-4">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger value="appearance">Appearance</TabsTrigger>
						<TabsTrigger value="notifications">Notifications</TabsTrigger>
						<TabsTrigger value="privacy">Privacy</TabsTrigger>
					</TabsList>

					{/* Profile Tab */}
					<TabsContent value="profile" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Profile Information</CardTitle>
								<CardDescription>Update your profile details and personal information</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Profile Picture Section */}
								<div className="space-y-4">
									<label htmlFor="avatar-upload" className="text-sm font-medium">
										Profile Picture
									</label>
									<div className="flex items-center gap-6">
										<Avatar className="h-24 w-24">
											<AvatarImage src={previewImage || editedSettings.avatar} alt={editedSettings.name} />
											<AvatarFallback>{editedSettings.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className="space-y-2">
											<div className="relative">
												<input
													type="file"
													accept="image/*"
													onChange={handleImageUpload}
													className="hidden"
													id="avatar-upload"
												/>
												<label htmlFor="avatar-upload">
													<Button type="button" variant="outline" size="sm" asChild className="cursor-pointer">
														<span>
															<UploadIcon className="mr-2 h-4 w-4" />
															Upload Image
														</span>
													</Button>
												</label>
											</div>
											<p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 5MB</p>
											{previewImage && (
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => {
														setPreviewImage(null);
														setEditedSettings((prev) => ({
															...prev,
															avatar: userSettings.avatar,
														}));
													}}
												>
													<XIcon className="mr-2 h-4 w-4" />
													Remove
												</Button>
											)}
										</div>
									</div>
								</div>

								<Separator />

								{/* Name */}
								<div className="space-y-2">
									<label htmlFor="name" className="text-sm font-medium">
										Full Name
									</label>
									<Input
										id="name"
										name="name"
										value={editedSettings.name}
										onChange={handleInputChange}
										placeholder="Enter your full name"
									/>
								</div>

								{/* Email */}
								<div className="space-y-2">
									<label htmlFor="email" className="text-sm font-medium">
										Email Address
									</label>
									<Input
										id="email"
										name="email"
										type="email"
										value={editedSettings.email}
										onChange={handleInputChange}
										placeholder="your.email@example.com"
									/>
								</div>

								{/* Bio */}
								<div className="space-y-2">
									<label htmlFor="bio" className="text-sm font-medium">
										Bio
									</label>
									<textarea
										id="bio"
										name="bio"
										value={editedSettings.bio}
										onChange={handleInputChange}
										placeholder="Tell us about yourself"
										className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									/>
								</div>

								{/* Website */}
								<div className="space-y-2">
									<label htmlFor="website" className="text-sm font-medium">
										Website
									</label>
									<Input
										id="website"
										name="website"
										type="url"
										value={editedSettings.website}
										onChange={handleInputChange}
										placeholder="https://example.com"
									/>
								</div>

								{/* Location */}
								<div className="space-y-2">
									<label htmlFor="location" className="text-sm font-medium">
										Location
									</label>
									<Input
										id="location"
										name="location"
										value={editedSettings.location}
										onChange={handleInputChange}
										placeholder="City, Country"
									/>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 pt-4">
									<Button onClick={handleSaveProfile} disabled={isLoading}>
										<SaveIcon className="mr-2 h-4 w-4" />
										{isLoading ? "Saving..." : "Save Changes"}
									</Button>
									<Button variant="outline" onClick={handleCancel} disabled={isLoading}>
										Cancel
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Appearance Tab */}
					<TabsContent value="appearance" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Theme</CardTitle>
								<CardDescription>Choose your preferred theme appearance</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{[
										{
											name: "system",
											desc: "Match your device settings",
											icon: MonitorIcon,
										},
										{
											name: "light",
											desc: "Bright and clean interface",
											icon: SunIcon,
										},
										{
											name: "dark",
											desc: "Easy on the eyes",
											icon: MoonIcon,
										},
									].map((th) => (
										<button
											type="button"
											key={th.name}
											onClick={() => setTheme(th.name as typeof theme)}
											className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
												theme === th.name ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"
											}`}
										>
											<th.icon className="h-6 w-6" />
											<div className="text-left">
												<h3 className="font-semibold">{th.name.charAt(0).toUpperCase() + th.name.slice(1)}</h3>
												<p className="text-sm text-muted-foreground">{th.desc}</p>
											</div>
										</button>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Notifications Tab */}
					<TabsContent value="notifications" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Notification Settings</CardTitle>
								<CardDescription>Manage how you receive notifications</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{NOTIFICATIONS.map((item) => (
									<SwitchOption key={item.title} item={item} data={notifications} action={handleNotificationToggle} />
								))}

								<Separator />

								<Button>
									<SaveIcon className="mr-2 h-4 w-4" />
									Save Preferences
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Privacy Tab */}
					<TabsContent value="privacy">
						<div className="py-0 gap-0 overflow-hidden">
							<CardHeader className="py-6">
								<CardTitle>Privacy & Security</CardTitle>
								<CardDescription>Manage your account security and privacy</CardDescription>
							</CardHeader>
							<div className="flex flex-col gap-8 p-4">
								<Separator className="h-2" />
								{PRIVACY_ACTION.slice(0, 2).map((item) => (
									<ActionOption key={item.title} item={item} action={handleUpdate} />
								))}

								{PRIVACY_SWITCH.map((item) => (
									<SwitchOption item={item} key={item.title} data={notifications} action={handleNotificationToggle} />
								))}

								<Separator />

								{PRIVACY_ACTION.slice(2, 5).map((item) => (
									<ActionOption key={item.title} item={item} action={handleUpdate} />
								))}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

function ActionOption({ item, action }: { item: ActionItemInterface; action: (key: string) => void }) {
	return (
		<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 flex items-center justify-center rounded-full border-2">
					<item.icon className="h-5 w-5 text-muted-foreground" />
				</div>
				<div>
					<p className="font-semibold">{item.title}</p>
					<p className="text-sm text-muted-foreground -mt-0.5">{item.desc}</p>
				</div>
			</div>

			{item.action.type && item.action.type.toLowerCase().includes("destructive") ? (
				<Dialog>
					<form>
						<DialogTrigger asChild>
							<Button
								variant={item.action.type === "destructive" ? "destructive" : "outline"}
								size="sm"
								className={cn(item.action.type === "mildDestructive" ? "text-destructive hover:text-destructive" : "")}
							>
								{/* <item.icon className="mr-2 h-4 w-4" /> */}
								{item.action.title}
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Are you sure want to {item.title}?</DialogTitle>
								<DialogDescription>{item.desc}</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									type="submit"
									variant={item.action.type === "destructive" ? "destructive" : "default"}
									onClick={() => action(item.action.key)}
									// className={cn(
									// 	item.action.type === "mildDestructive" ? "text-destructive hover:text-destructive" : "",
									// )}
								>
									{item.action.title}
								</Button>
							</DialogFooter>
						</DialogContent>
					</form>
				</Dialog>
			) : (
				<Button
					variant={item.action.type === "destructive" ? "destructive" : "outline"}
					size="sm"
					onClick={() => action(item.action.key)}
					className={cn(item.action.type === "mildDestructive" ? "text-destructive hover:text-destructive" : "")}
				>
					{/* <item.icon className="mr-2 h-4 w-4" /> */}
					{item.action.title}
				</Button>
			)}
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
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 flex items-center justify-center rounded-full border-2">
					<item.icon className="h-5 w-5 text-muted-foreground" />
				</div>
				<div>
					<p className="font-semibold">{item.title}</p>
					<p className="text-sm text-muted-foreground -mt-0.5">{item.desc}</p>
				</div>
			</div>
			<Switch checked={data[item.action.key]} onClick={() => action(item.action.key)} />
		</div>
	);
}
