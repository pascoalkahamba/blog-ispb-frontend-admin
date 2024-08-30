interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return <section className="pt-20 p-3">{children}</section>;
}
