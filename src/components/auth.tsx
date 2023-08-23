'use client'
import { signIn, useSession ,signOut} from "next-auth/react"

export default function Index() {
  const session = useSession();
  console.log(session);
  return (
    <div>
    <button className="" onClick={() => signIn("azure-ad")}>
      Sign in
    </button>
    <button className="" onClick={() => signOut()}>
      Sign out
    </button>
    </div>
  );
}