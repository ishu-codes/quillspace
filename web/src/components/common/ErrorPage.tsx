interface Props {
  message?: string;
}

export default function ErrorPage({ message = "Not found!" }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h2 className="text-3xl text-muted-foreground">{message}</h2>
    </div>
  );
}
