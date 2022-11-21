/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { patchUserAvatar } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";

const ChangeAvatar: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { isLoadingEl, setIsLoading } = useLoading(false, "Applying Changes");
  const prodImgInputRef = useRef<HTMLInputElement>(null!);
  const userPassRef = useRef<HTMLInputElement | null>(null!);
  const nav = useNavigate();

  const clickUploadHandler = () => prodImgInputRef.current.click();
  const changeAvatarHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please provide a image");
      return;
    }
    setIsUploading(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    fetch("https://api.imgbb.com/1/upload?key=47f97e3cdbc68c81f1f141c8042eb2e4", {
      body: formData,
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        const data = {
          password: userPassRef.current?.value,
          user_pic_url: res.data.url,
        };
        return patchUserAvatar(data);
      })
      .then((res) => {
        setIsLoading(false);
        setIsUploading(false);
        if (!res.ok) return;
        setPrevImg("");
        setSelectedImage(null);
        toast.success(
          "Avatar Changed Successfully \n Relogin to see changes. Redirecting to Shop..."
        );
        setTimeout(() => {
          nav("/");
        }, 2000);
      });
  };

  return (
    <section className='w-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, x: -800, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className='auth-container'
      >
        <h2 className='text-3xl my-4'>Acrie | Change Avatar</h2>
        <form onSubmit={changeAvatarHandler} className='mb-4 flex flex-col '>
          <input
            type='file'
            className='hidden'
            accept='image/png, img/jpg, img/jpeg'
            onChange={(e) => {
              setSelectedImage(e.target.files![0]);
              setPrevImg(URL.createObjectURL(e.target?.files![0]));
            }}
            ref={prodImgInputRef}
          />

          <button
            type='button'
            className='auth-button mt-2  bg-gradient-to-r from-orange-500 '
            style={{ backgroundColor: "#53a954" }}
            onClick={clickUploadHandler}
          >
            Upload New Avatar <br /> (Maintain a 1x1 ratio)
          </button>
          {prevImg !== "" && (
            <img src={prevImg} alt='product image selected' width={280} className='mt-4' />
          )}
          <input
            ref={userPassRef}
            name='userPassword'
            id='userPassword'
            className='auth-input mt-4'
            type='password'
            placeholder='Password'
          />

          <button type='submit' className='auth-button mt-5' style={{ backgroundColor: "#53a954" }}>
            Submit Changes
          </button>
          {isUploading && (
            <p className='w-[275px] text-center'>
              We are using a free img api to upload images, it might take a while{" "}
            </p>
          )}
        </form>
        {isLoadingEl}
      </motion.div>
    </section>
  );
};
export default ChangeAvatar;
