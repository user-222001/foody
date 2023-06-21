"use client";
import Posts from "@/components/post/Posts";
import app from "../../components/utilis/firebase.config";
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

const Homepage = () => {
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
      <section>
        <div class="grid max-w-screen-xl px-4 pt-20  mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 lg:pt-8">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="tracking-wide font-s max-w-2xl mb-6 text-4xl font-extrabold leading-none  md:text-5xl xl:text-6xl dark:text-black">
              Where every flavor
              <br />
              tells a story.
            </h1>
            <p class=" max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              landing page was built using the utility classes from and based on
              the components from the nextjs
            </p>
          </div>
          <div class=" lg:mt-0 lg:col-span-5 lg:flex">
            <img
              className="rounded-[2rem]"
              src="https://images7.alphacoders.com/977/977986.jpg"
              alt="hero image"
            />
          </div>
        </div>
      </section>
      <GameList className="py-28" onGamePress={onGamePress} />
      {posts ? <Posts posts={posts} /> : null}
    </div>
  );
};

export default Homepage;
