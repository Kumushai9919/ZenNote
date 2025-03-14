"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
        <DialogContent>
            <DialogHeader className="border-b pb-3 ">
                <DialogTitle className="text-lg font-medium">
                    My settings
                </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <Label>
                        Appearance
                    </Label>
                    <span className="text-muted-foreground text-[0.8rem]">
                        Customize how ZenNote looks on your device
                    </span>
                </div>
                <ModeToggle />
            </div>
        </DialogContent>
    </Dialog>
  );
};
