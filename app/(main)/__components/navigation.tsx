"use client";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search, 
  Music2,
  Settings,
  Plus,
  Trash,
  Timer,
  ChevronsUp,
  ChevronDown,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";
import { useFocusMode } from "@/hooks/use-focus-mode";
import FocusMode from "./focusmode";
import { useMusic } from "@/hooks/music";
import Music from "./music";

export const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();
  const focusMode = useFocusMode();
  const music = useMusic();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  console.log({ isCollapsed, isMobile });

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]); // if pathname changes, collapse the sidebar

  const handleMouseDown = (
    // handleMouseDown is going to be used to start resizing our sidebar
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove); //handleMouseMove is going to be used to resize our sidebar
    document.addEventListener("mouseup", handleMouseUp); // handleMouseUp is going to be used to stop resizing our sidebar - when we leave mouse - put finger above
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 200) newWidth = 200;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      ); // navbar width is 100% - sidebar width
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300); // change the state back to false after 300ms delay
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created",
      error: "Failed to create note",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          {/* ✅ Focus Mode Toggle Button */}
          <div
            onClick={focusMode.isOpen ? focusMode.onClose : focusMode.onOpen} // ✅ Toggle Open/Close
            className="cursor-pointer flex items-center justify-between p-3 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            <div className="flex items-center text-sm">
              <Timer className="h-5 w-5 text-[#B03052]" />
              <span className="text-[#B03052] ml-2 font-semibold ">
                Focus Mode
              </span>
            </div>
            {focusMode.isOpen ? (
              <ChevronsUp size={18} color="#B03052" />
            ) : (
              <ChevronDown size={18} color="#B03052" />
            )}
          </div>

          {focusMode.isOpen && <FocusMode />}

          {/* ✅ Music spotify */}

          <div
            onClick={music.isOpen ? music.onClose : music.onOpen}
            className="cursor-pointer flex items-center justify-between p-3 rounded-sm  hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            <div className="flex items-center text-sm">
              <Music2 className="h-5 w-5 text-[#B03052]" />
              <span className="text-[#B03052] ml-2 font-semibold ">Music</span>
            </div>
            {music.isOpen ? (
              <ChevronsUp size={18} color="#B03052" />
            ) : (
              <ChevronDown size={18} color="#B03052" />
            )}
          </div>
          {music.isOpen && <Music />}

          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover onOpenChange={(open) => !open || search.isOpen}>
            <PopoverTrigger className="w-full mt-4 ">
              <Item icon={Trash}  label="Trash" />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100
          transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0  z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                role="button"
                className="h-6 w-6 text-muted-foreground"
                onClick={resetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
