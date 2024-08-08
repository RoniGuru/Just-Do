"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

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
                label="Open chat"
                labelIcon={<DotIcon />}
                onClick={() => alert("init chat")}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
}
