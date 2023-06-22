"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  return (
    <div className="navbar bg-base-100 fixed top-0 shadow-md px-10 z-50 ">
      <div className="flex-1">
        <a
          onClick={() => router.push("/")}
          className="font-bold normal-case text-xl"
        >
          daisyUI
        </a>
      </div>
      <div className="flex-none gap-10">
        <button
          onClick={() => router.push("/create-post")}
          className="bg-slate-500 p-2 px-3 text-white rounded-full text-[10px]"
        >
          Add Recipes
        </button>

        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-slate-500 p-2 px-3 text-white rounded-full text-[10px]"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-slate-500 p-2 px-3 text-white rounded-full text-[10px]"
          >
            Login
          </button>
        )}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {session ? (
                <img src={session.user.image} alt="" />
              ) : (
                <img src="https://static.vecteezy.com/system/resources/previews/020/911/731/original/profile-icon-avatar-icon-user-icon-person-icon-free-png.png" />
              )}
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 p-2  dropdown-content bg-white shadow-xl rounded-lg w-72"
          >
            <>
              <div>
                {session ? (
                  <div className="flex flex-col gap-3 p-5">
                    <p>{session.user.name}</p>
                    <p> {session.user.email}</p>
                    <button
                      onClick={() => router.push("/profile")}
                      className="btn btn-outline btn-primary"
                    >
                      Profile
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="btn btn-outline btn-primary"
                  >
                    Login
                  </button>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
