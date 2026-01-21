import Posts from "./Posts";

export default function Drafts() {
  return <Posts postType="DRAFT" prefixUrl="/drafts" />;
}
