"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { toast } from "sonner";

import { useAuth } from "@clerk/nextjs";

async function deleteUser() {
  try {
    await axios.delete("/api/clerk/delete-user/");
  } catch (error) {
    return Response.json({ error: "Failed to create step" }, { status: 500 });
  }
}

export function TopNav() {
  const { signOut } = useAuth();

  return (
    <nav className="navBg flex w-full items-center justify-between p-4 text-xl font-semibold">
      <div className="text-2xl font-bold text-white">JustDo</div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Delete User"
                labelIcon={<CgDanger size={18} className="center" />}
                onClick={async () => {
                  const userConfirmed = window.confirm(
                    "Do you want to delete this account and all its data",
                  );
                  if (userConfirmed) {
                    toast("deleting", { duration: Infinity, id: "deleting" });
                    await deleteUser()
                      .then(() => {
                        toast.dismiss("deleting");
                        signOut();
                      })
                      .catch((error: Error) => console.log(error));
                  }
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
}
