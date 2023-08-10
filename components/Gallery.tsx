"use client";

import { FC, useState } from "react";

import { IImage } from "@/types";
import Button from "./ui/Button";

interface GalleryProps {
  images: IImage[];
  type?: "horizontal" | "vertical";
}

const Gallery: FC<GalleryProps> = ({ images, type = "vertical" }) => {
  const [activeImg, setActiveImage] = useState(images[0].url);

  return (
    <div
      className={`flex ${
        type === "vertical" ? "flex-row" : "flex-col"
      }  gap-5 `}
    >
      <div
        className={`flex ${
          type === "vertical" ? "flex-col" : "flex-row"
        } gap-2 w-12`}
      >
        {images.map((image, index) => (
          <Button
            className="group h-12 rounded-md w-12"
            key={index}
            variant="outlined"
          >
            <img
              src={image.url}
              alt=""
              className="object-contain rounded-md cursor-pointer h-12 w-12"
              onClick={() => setActiveImage(image.url)}
            />
          </Button>
          // <button
          //   key={index}
          //   className={`
          //     active:scale-95
          //     border
          //     border-black/25
          //     duration-200
          //     group
          //     h-12
          //     hover:border-2
          //     hover:border-black
          //     rounded-md
          //     transition
          //     w-12
          //     ${activeImg === image.url && "border-black border-2"}
          // `}
          // >

          // </button>
        ))}
      </div>
      <div className="w-[700px] h-[500px] flex justify-center items-center">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full aspect-square object-contain rounded-xl"
        />
      </div>
    </div>
  );
};

export default Gallery;
