"use client";

import CarouselCards from "@/components/carouselCards";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [windowWidth, setWindowWidth] = useState(0); // Initialize as 0
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track mount state

  // Run only on the client after component has mounted
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsMounted(true); // Set to true when component is mounted

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImagesToShow = useCallback(() => {
    if (windowWidth < 500) {
      return 1;
    } else if (windowWidth < 767) {
      return 2;
    } else if (windowWidth < 1200) {
      return 3;
    } else {
      return 4;
    }
  }, [windowWidth]);

  const imagesToShow = getImagesToShow();

  // Update the existing images with new ones when Next icon is clicked
  const clickNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Update the existing images with new ones when Back icon is clicked
  const clickPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  // Create the display images array
  const getVisibleImages = () => {
    const visibleImages = [];

    for (let i = 0; i < imagesToShow; i++) {
      const index = (currentIndex + i) % images.length;
      visibleImages.push({ ...images[index], index });
    }

    return visibleImages;
  };

  // Update the number of images to show when window width changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [imagesToShow]);

  // Use a timer to automatically go to the next image
  useEffect(() => {
    if (!isHovering) {
      const timer = setTimeout(() => {
        clickNext();
      }, 5000); // Change image every 5 seconds

      return () => clearTimeout(timer); // Clear the timer on cleanup
    }
  }, [currentIndex, isHovering, clickNext]);

  // Ensure that the component is mounted before rendering to avoid mismatches
  if (!isMounted) {
    return null; // Avoid rendering on the server and during initial hydration
  }

  return (
    <main className="flex flex-col -mx-1.5 md:mx-0">
      <div
        className="flex w-full mx-auto rounded-2xl md:mb-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button className="mr-1.5 md:mr-3 xl:mr-6" onClick={clickPrev}>
          <IoIosArrowBack className="text-mw_black h-7 w-7 md:h-9 md:w-9 hover:scale-125 transition duration-150 ease-in-out" />
        </button>

        <div className="flex justify-center gap-x-5 xl:gap-x-7 w-full partner-carousel">
          {getVisibleImages().map((image, index) => (
            <CarouselCards
              key={image.index}
              image={image}
              isFlipped={flippedCards[image.index] || false}
              onFlip={() => {
                setFlippedCards((prev) => ({
                  ...prev,
                  [image.index]: !prev[image.index],
                }));
              }}
            />
          ))}
        </div>

        <button className="ml-1.5 md:ml-3 xl:ml-6" onClick={clickNext}>
          <IoIosArrowForward className="text-mw_black h-7 w-7 md:h-9 md:w-9 hover:scale-125 transition duration-150 ease-in-out" />
        </button>
      </div>
    </main>
  );
};











// import { useEffect, useState, useCallback } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import CarouselCards from "@/components/carouselCards";


// // export default function Carousel({ images }) {
// //     const [currentIndex, setCurrentIndex] = useState(0);
// //     const [flippedCards, setFlippedCards] = useState({});
// //     const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
// //     const [isHovering, setIsHovering] = useState(false);

// //     // Determine the number of images to display based on screen width
// //     const getImagesToShow = useCallback(() => {
// //         if (windowWidth < 500) {
// //             return 1;
// //         } else if (windowWidth < 767) {
// //             return 2;
// //         } 
// //         else if (windowWidth < 1200) {
// //             return 3;
// //         }
// //         else {
// //             return 4;
// //         }
// //     }, [windowWidth]);

// //     const imagesToShow = getImagesToShow();



// export default function Carousel({ images }) {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [flippedCards, setFlippedCards] = useState({});
//     const [windowWidth, setWindowWidth] = useState(0); // Initialize as 0
//     const [isHovering, setIsHovering] = useState(false);
//     const [isMounted, setIsMounted] = useState(false); // Track mount state

//     // Run only on the client after component has mounted
//     useEffect(() => {
//         setWindowWidth(window.innerWidth);
//         setIsMounted(true); // Set to true when component is mounted
        
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const getImagesToShow = useCallback(() => {
//         if (windowWidth < 500) {
//             return 1;
//         } else if (windowWidth < 767) {
//             return 2;
//         } else if (windowWidth < 1200) {
//             return 3;
//         } else {
//             return 4;
//         }
//     }, [windowWidth]);

//     const imagesToShow = getImagesToShow();

//     // Ensure that the component is mounted before rendering to avoid mismatches
//     if (!isMounted) {
//         return null; // Avoid rendering on the server and during initial hydration
//     }

//     // Update the existing images with new once when Forward icon hits
//     const clickNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     // Update the existing images with new once when Back icon hits
//     const clickPrev = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//     };

//     // Create the display images array
//     const getVisibleImages = () => {
//         const visibleImages = [];

//         for (let i = 0; i < imagesToShow; i++) {
//             const index = (currentIndex + i) % images.length;
//             visibleImages.push({ ...images[index], index });
//         };
        
//         return visibleImages;
//     };

//     // Handle window resize
//     // useEffect(() => {
//     //     const handleResize = () => setWindowWidth(window.innerWidth);
//     //     window.addEventListener('resize', handleResize);
//     //     return () => window.removeEventListener('resize', handleResize);
//     // }, []);

//     // Update the number of images to show when window width changes
//     // useEffect(() => {
//     //     setCurrentIndex(0); 
//     // }, [imagesToShow]);

//     // Use a timer to automatically go to the next image
//     // useEffect(() => {
//     //     if (!isHovering) {
//     //         const timer = setTimeout(() => {
//     //             clickNext();
//     //         }, 5000);
//     //        return () => clearTimeout(timer);
//     //     };
//     // }, [currentIndex, isHovering]);

//     return (
//         <main className="flex flex-col -mx-1.5 md:mx-0">
//             <div
//                 className="flex w-full mx-auto rounded-2xl md:mb-8"
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => setIsHovering(false)}
//             >
//                 <button
//                     className="mr-1.5 md:mr-3 xl:mr-6"
//                     onClick={clickPrev}
//                 >
//                     <IoIosArrowBack className="text-mw_black h-7 w-7 md:h-9 md:w-9 hover:scale-125 transition duration-150 ease-in-out" />
//                 </button>

//                 <div className="flex justify-center gap-x-5 xl:gap-x-7 w-full partner-carousel">
//                     {getVisibleImages().map((image, index) => (
//                         <CarouselCards
//                             key={image.index}
//                             image={image}
//                             isFlipped={flippedCards[image.index] || false}
//                             onFlip={() => {
//                                 setFlippedCards((prev) => ({
//                                     ...prev,
//                                     [image.index]: !prev[image.index]
//                                 }));
//                             }}
//                         />
//                     ))}
//                 </div>

//                 <button
//                     className="ml-1.5 md:ml-3 xl:ml-6"
//                     onClick={clickNext}
//                 >
//                     <IoIosArrowForward className="text-mw_black h-7 w-7 md:h-9 md:w-9 hover:scale-125 transition duration-150 ease-in-out" />
//                 </button>
//             </div>
//         </main>
//     );
// };
