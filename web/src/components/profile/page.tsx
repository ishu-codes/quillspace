import { useParams } from "react-router-dom";

import ProfileContent from "./ProfileContent";
import ErrorPage from "./Error";

export default function ProfilePage() {
  const { userId } = useParams();

  if (!userId) {
    return <ErrorPage message="Invalid userId" />;
  }

  return <ProfileContent {...{ userId }} />;
}
