"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const IMG_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";
export default function CustomImage({
    src = null,
    alt = "image",
    className = "",
    style = {},
    width = 500,
    height = 500,
    fill = false,
    priority = false,
    sizes
}) {
    const [imgSrc, setImgSrc] = useState(null);
    useEffect(() => {
        if (typeof src === "string" && src.trim() !== "") {
            if (
                src.startsWith("blob:") ||
                src.startsWith("data:") ||
                src.startsWith("http")
            ) {
                setImgSrc(src);
            } else {
                setImgSrc(`${IMG_URL}${src}`);
            }
        } else {
            setImgSrc(null);
        }
    }, [src]);
    if (!imgSrc) return null;
    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            sizes={sizes}
            className={className}
            style={style}
            unoptimized
            priority={priority}
        />
    );
}
