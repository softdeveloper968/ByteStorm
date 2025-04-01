import { useCallback, useEffect, useRef, useState } from "react";

export default function DraggablePopup({ children }) {
  const popupRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Default initial position
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Only access `window` on the client side
    useEffect(() => {
        const setInitialPosition = () => {
            // setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });    // Original bottom center-ish.
            // setPosition({ x: 20, y: 20 });  // Popup appears in upper left corner.
            setPosition({ x: 20, y: window.innerHeight - 625 });  // Popup appears in lower left corner.
        };

    if (typeof window !== "undefined") {
      setInitialPosition();
      window.addEventListener("resize", setInitialPosition); // Update position on window resize
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", setInitialPosition);
      }
    };
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      const { offsetWidth, offsetHeight } = popupRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={popupRef}
      className={`absolute bg-black rounded-lg pt-[15px] z-10 pointer-events-auto`}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.5)",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
