import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";

const ClientPortal = ({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) => {
  const ref = useRef<Element | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("body") as Element;
    setMounted(true);
  }, []);

  //Prevent the body from scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
    return () => {
      document.body.removeAttribute("style");
    };
  }, [show]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};

export default function SideDrawer({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <ClientPortal show={show}>
      <Transition
        show={show}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-white text-gray-700 lg:w-1/2"
        enter="transition delay-150 duration-500 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition duration-500 delay-150 ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Transition.Child
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="h-screen overflow-auto shadow-md"
        >
          {children}
        </Transition.Child>
      </Transition>
    </ClientPortal>
  );
}
