"use client";

import { useCurrentDate, useCurrentTime } from "@/hooks/time";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useKeyPress } from "@/hooks/key";
import { useClick } from "@/hooks/mouse";
import User from "@/components/basic/icons/user";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import useAppStore from "@/store/app";

const Login: React.FC = () => {
  const currentTime = useCurrentTime();
  const { date } = useCurrentDate();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const cridentialRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isHide, setIsHide] = useState<boolean>(false);
  const { setAppUser, setOpenModal } = useAppStore();
  const hideDate = () => {
    gsap.to(contentRef.current, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        startCridentialAnimation();
      },
    });
  };

  const hideWrapper = () => {
    gsap.to(wrapperRef.current, {
      duration: 0.5,
      opacity: 0,
    });
  };

  const startCridentialAnimation = () => {
    setIsHide(true);
    gsap.to(cridentialRef.current, {
      duration: 0.5,
      opacity: 1,
    });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isHide) {
      hideWrapper();
      setTimeout(() => setOpenModal(true), 500);
    }
    setAppUser(e.currentTarget.value);
  };
  useKeyPress("Enter", hideDate);
  useClick(hideDate);

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-full relative z-50 h-screen bg-cover bg-[url('/assets/images/login.jpg')] flex items-center justify-center"
      >
        <div
          ref={cridentialRef}
          className="absolute z-50 opacity-0 flex flex-col items-center justify-center w-full max-w-[300px] transform -translate-y-[100px]"
        >
          <User className="max-w-[200px] mb-10" />
          <div className="flex flex-row w-full items-center">
            <input
              type="text"
              placeholder="Username"
              className="font-mont outline-none h-input pl-3 w-full"
              autoFocus
              onKeyDown={handleEnter} // Change from onChange to onKeyDown
            />
            <Link
              href={"/main"}
              className="bg-gray-full h-input flex items-center justify-center w-[35px] cursor-pointer"
            >
              <BsArrowRight />
            </Link>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`flex flex-col relative z-20 px-8 py-20 transition-opacity duration-500 w-full h-screen justify-end`}
        >
          <h1 className="text-9xl text-white font-mont">{currentTime}</h1>
          <h1 className="text-white text-5xl font-mont">
            <span>{date}</span>
          </h1>
        </div>
        <div
          className={`absolute inset-0 z-10 bg-dark-300 transition-all duration-500 ${
            isHide ? "backdrop-blur" : ""
          }`}
        />
      </div>
    </>
  );
};

export default Login;
