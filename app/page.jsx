"use client";
import Posts from "@/components/Posts";
import app from "../components/utilis/firebase.config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import GameList from "@/components/categories/categories";

const page = () => {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  //..............
  const onGamePress = async (gameName) => {
    setPosts([]);
    if (gameName == "Other Games") {
      getPost();
      return;
    }
    const q = query(collection(db, "posts"), where("game", "==", gameName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <section className=" bg-neutral-100 ">
        <div className=" grid lg:grid-cols-2 items-center justify-items-center ">
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold md:text-7xl text-orange-600">
              25% OFF
            </p>
            <p className="text-4xl font-bold md:text-7xl">SUMMER SALE</p>
            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
              src="https://images7.alphacoders.com/977/977986.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
      <GameList className="py-28" onGamePress={onGamePress} />
      {posts ? <Posts posts={posts} /> : null}
    </div>
  );
};

export default page;
