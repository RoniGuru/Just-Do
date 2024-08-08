"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CgDanger } from "react-icons/cg";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

async function deleteUser() {
  try {
    const response = await axios.delete("/api/clerk/delete-user/");
  } catch (error: Error | any) {
    return Response.json({ error: "Failed to create step" }, { status: 500 });
  }
}

export function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

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
                onClick={() => {
                  const userConfirmed = window.confirm(
                    "Do you want to delete this account and all its data",
                  );
                  if (userConfirmed) {
                    toast("deleting", { duration: Infinity, id: "deleting" });
                    deleteUser().then(() => {
                      toast.dismiss("deleting");
                      window.location.reload();
                      router.push("/login");
                    });
                  } else {
                  }
                }}
              />
              <UserButton.Action
                label="refresh"
                labelIcon={<CgDanger size={18} className="center" />}
                onClick={() => {
                  window.location.reload();
                }}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
}
