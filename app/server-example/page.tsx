import CustomLink from "@/components/custom-link";
import SessionData from "@/components/session-data";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();

  return (
    <div className="space-y-2 max-w-3xl flex-auto mx-auto sm:px-6 px-4">
      <h1 className="text-3xl font-bold">React Server Componentの扱い方</h1>
      <p>
        このページは
        <CustomLink href="https://nextjs.org/docs/app/building-your-application/rendering/server-components">
          React Server Component
        </CustomLink>
        のServerComponentとして表示されています。
        <CustomLink href="https://nextjs.authjs.dev#auth">
          <code>auth()</code>
        </CustomLink>
        メソッドを利用してsessionを取得しています。
      </p>
      <SessionData session={session} />
    </div>
  );
}
