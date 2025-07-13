"use client";

import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { Galleries } from "@/types/gallery";
import { getCloudinaryPublicId } from "@/utils/formatUtils";
import { Fragment } from "react";
import { PreviewData } from "@/types/previewData";

interface ImageGalleryProps {
  images?: Galleries;
  alt?: string;
  previewData?: PreviewData | null;
}

export default function ImageGallery({
  images,
  alt,
  previewData,
}: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      {/* 图片选择缩略图 (不变) */}
      <div className="mx-auto mt-6 mb-6 w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images?.map((image) => (
            <Tab
              key={image.id}
              className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">{image.name}</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  alt={alt ?? ""}
                  src={getCloudinaryPublicId(image.url)}
                  className="size-full object-scale-down"
                  width={image.width}
                  height={image.height}
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500"
              />
            </Tab>
          ))}
        </TabList>
      </div>

      {/* 主图显示区域 */}
      <div className="relative w-full aspect-square">
        <TabPanels>
          {images?.map((image) => (
            <TabPanel key={image.id}>
              <Image
                alt={alt ?? ""}
                src={getCloudinaryPublicId(image.url)}
                priority={true}
                className="h-full w-full object-cover object-center rounded-lg"
                width={image.width}
                height={image.height}
              />
            </TabPanel>
          ))}
        </TabPanels>

        {/* Preview image overlay */}
        <Transition
          as={Fragment}
          show={!!previewData?.url}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-none absolute inset-0">
            {previewData?.url && (
              <>
                <Image
                  src={previewData.url}
                  alt="Preview Image"
                  fill
                  className="h-full w-full object-cover object-center rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-white text-center text-sm backdrop-blur-sm">
                  <p>{previewData.name}</p>{" "}
                  {previewData.description && <p>{previewData.description}</p>}
                </div>
              </>
            )}
          </div>
        </Transition>
      </div>
    </TabGroup>
  );
}
