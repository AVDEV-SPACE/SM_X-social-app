"use client";

import { IKImage } from "imagekitio-next";
import Image from "next/image";

type ImageType = {
  path?: string; 
  src?: string; 
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const ImageU = ({ path, src, w, h, alt, className, tr }: ImageType) => {
  // Dacă avem src, folosim next/image pentru fișiere locale
  if (src) {
    return (
      <Image
        src={src}
        width={w}
        height={h}
        alt={alt}
        className={className}
      />
    );
  }

  // Dacă avem path, folosim ImageKit pentru imagini remote
  if (path && urlEndpoint) {
    return (
      <IKImage
        urlEndpoint={urlEndpoint}
        path={path}
        {...(tr && w && h
          ? { transformation: [{ width: `${w}`, height: `${h}` }] }
          : { width: w, height: h })}
        lqip={{ active: true, quality: 20 }}
        alt={alt}
        className={className}
      />
    );
  }

  // Fallback dacă niciuna dintre opțiuni nu este valabilă
  return (
    <Image
      src="/default-image.jpg"
      width={w || 100}
      height={h || 100}
      alt={alt}
      className={className}
    />
  );
};

export default ImageU;