import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import Image from 'next/image'
import { Galleries } from '@/types/gallery'

interface ImageGalleryProps {
  images?: Galleries;
  alt?: string
}

export default function ImageGallery({ images,alt }: ImageGalleryProps) {

  if (!images || images.length === 0) {
    return null
  }

  return (
    <TabGroup className="flex flex-col-reverse">
    {/* Image selector */}
    <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
      <TabList className="grid grid-cols-4 gap-6">
        {images?.map((image) => (
          <Tab
            key={image.id}
            className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-black uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
          >
            <span className="sr-only">{image.name}</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <Image alt={alt} 
              src={image.url} 
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

    <TabPanels>
      {images?.map((image) => (
        <TabPanel key={image.id}>
          <Image alt={alt} 
          src={image.url} 
          className="aspect-square w-full object-cover sm:rounded-lg" 
          width={image.width}
          height={image.height}
          />
        </TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
  )
} 