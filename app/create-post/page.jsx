"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import app from "../../components/utilis/firebase.config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Data from "../../components/categories/data.cat";
//..
function CreatePost() {
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, []);
  //........form handle

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);

  const { data: session } = useSession({ required: true });
  // const { data: session, status } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);
  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  useEffect(() => {
    if (submit == true) {
      savePost();
    }
  }, [submit]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, "arun-foody/" + file?.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Upload a file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
  };

  const savePost = async () => {
    await setDoc(doc(db, "posts", Date.now().toString()), inputs);
  };
  return (
    <div className="flex justify-center">
      <div className="p-6 mt-8 lg:w-[35%] md:w-[50%]">
        <h2
          className="text-[30px] 
        font-extrabold text-blue-500"
        >
          Add Recipes
        </h2>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              onChange={handleChange}
              className="w-full mb-4 border-[1px] p-2 rounded-md"
            />
            <textarea
              name="desc"
              className="w-full mb-4 
        outline-blue-400 border-[1px] 
        p-2 rounded-md"
              required
              onChange={handleChange}
              placeholder="Write Description here"
            />

            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              className="w-full mb-4 border-[1px] p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              required
              onChange={handleChange}
              className="w-full mb-4 border-[1px] p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Zip"
              name="zip"
              required
              onChange={handleChange}
              className="w-full mb-4 border-[1px] p-2 rounded-md"
            />
            <select
              name="game"
              onChange={handleChange}
              required
              className="w-full mb-4 border-[1px] p-2 rounded-md"
            >
              <option disabled defaultValue>
                Select Game
              </option>
              {Data.GameList.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/gif, image/jpeg, image/png"
              className="mb-5 border-[1px] w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 w-full p-1 
rounded-md text-white"
            >
              Submit
            </button>

            <button
              onClick={() => {
                router.push("/");
              }}
              type="button"
              className="bg-red-500 w-full my-7  p-1 
rounded-md text-white"
            >
              close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "./profile",
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// };
