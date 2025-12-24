import { useAuthSession } from "@/hooks/useAuthSession";
import { ProfileContent } from "../profile";

export default function Profile() {
  const { session } = useAuthSession();

  return (
    <div className="h-full py-8">
      <div className="max-w-4xl flex flex-col gap-8 mx-auto px-4">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-2">View your profile status.</p>
        </div>
      </div>
      <ProfileContent userId={session?.user.id!} />
    </div>
  );
}
