"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CgDanger } from "react-icons/cg";
import axios from "axios";

async function deleteUser() {
  const response = await axios.delete("/api/clerk/delete-user/");

  console.log(response);
  window.location.reload();
}

export function TopNav() {
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
                    deleteUser();
                  } else {
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
