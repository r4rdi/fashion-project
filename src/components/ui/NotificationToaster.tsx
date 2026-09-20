"use client";

import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotificationToaster() {
  const notifications = useNotificationStore(state => state.notifications);
  const markAsRead = useNotificationStore(state => state.markAsRead);
  
  // Show only unread notifications as toasts (max 3 at a time)
  const unreadNotifications = notifications.filter(n => !n.read).slice(0, 3);

  if (unreadNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {unreadNotifications.map((notif) => {
        
        let Icon = Info;
        let colorClass = "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-900";
        
        if (notif.type === 'success') {
          Icon = CheckCircle;
          colorClass = "bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-900";
        } else if (notif.type === 'warning') {
          Icon = AlertCircle;
          colorClass = "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-900";
        } else if (notif.type === 'error') {
          Icon = X;
          colorClass = "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-900";
        }

        return (
          <div 
            key={notif.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in duration-300",
              colorClass
            )}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold">{notif.title}</h4>
              <p className="text-sm mt-1 opacity-90">{notif.message}</p>
            </div>
            <button 
              onClick={() => markAsRead(notif.id)}
              className="shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
