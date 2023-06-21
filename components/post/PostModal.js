import React from "react";
import PostItem from "./PostItem";
import { HiOutlineXCircle } from "react-icons/hi";

function PostModal({ post }) {
  return (
    <div className="">
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <button className="absolute right-2 top-2 text-black">
            <HiOutlineXCircle className="text-[22px] text-black" />
          </button>
          <div>
            <PostItem post={post} />
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default PostModal;
