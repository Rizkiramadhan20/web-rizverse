import { useMemo } from "react";
import { DownloadItem } from "@/types/Download";

type PlatformKey = "android" | "ios" | "macos" | "windows";

export const useManagementDownload = (
  downloadData: DownloadItem[],
  preferredPlatform?: PlatformKey
) => {
  const platforms = useMemo(
    () =>
      [
        { key: "android", label: "Android", Icon: "Smartphone" },
        { key: "ios", label: "iOS", Icon: "Apple" },
        { key: "macos", label: "macOS", Icon: "Laptop" },
        { key: "windows", label: "Windows", Icon: "Monitor" },
      ] as const,
    []
  );

  // Group downloads by version
  const groupedByVersion: Record<string, DownloadItem[]> = useMemo(() => {
    return downloadData.reduce((acc, item) => {
      if (!acc[item.version]) acc[item.version] = [];
      acc[item.version].push(item);
      return acc;
    }, {} as Record<string, DownloadItem[]>);
  }, [downloadData]);

  // Sort versions (newest first)
  const sortedVersions = useMemo(() => {
    const compareVersions = (a: string, b: string) => {
      const pa = a.split(".").map(Number);
      const pb = b.split(".").map(Number);
      const len = Math.max(pa.length, pb.length);
      for (let i = 0; i < len; i++) {
        const da = pa[i] || 0;
        const db = pb[i] || 0;
        if (da !== db) return db - da; // desc
      }
      return 0;
    };
    return Object.keys(groupedByVersion).sort(compareVersions);
  }, [groupedByVersion]);

  // Get latest version and items
  const latestVersion = useMemo(() => sortedVersions[0], [sortedVersions]);
  const latestItems = useMemo(
    () => (latestVersion ? groupedByVersion[latestVersion] || [] : []),
    [latestVersion, groupedByVersion]
  );

  // Platform metadata mapping
  const platformMetaByKey = useMemo(() => {
    return Object.fromEntries(
      platforms.map((p) => [p.key, { label: p.label, Icon: p.Icon }])
    ) as Record<PlatformKey, { label: string; Icon: string }>;
  }, [platforms]);

  // Selected item logic
  const selectedItem: DownloadItem | undefined = useMemo(() => {
    if (latestItems.length === 0) return undefined;
    if (preferredPlatform) {
      const match = latestItems.find((i) => i.type === preferredPlatform);
      if (match) return match;
    }
    // Fallback: first available by the predefined order
    for (const { key } of platforms) {
      const match = latestItems.find((i) => i.type === key);
      if (match) return match;
    }
    return latestItems[0];
  }, [latestItems, preferredPlatform, platforms]);

  // Selected platform label
  const selectedPlatformLabel = useMemo(
    () =>
      selectedItem
        ? platformMetaByKey[(selectedItem.type as PlatformKey) || "windows"]
            ?.label
        : undefined,
    [selectedItem, platformMetaByKey]
  );

  // Download file function
  const downloadFile = async (url: string, filename?: string) => {
    try {
      // For Google Drive links, we need to handle them differently
      if (url.includes("drive.google.com")) {
        // Extract file ID and create a direct download link
        const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          // Create a temporary link element for direct download
          const link = document.createElement("a");
          link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
          link.download = filename || "rizverse-download";
          link.target = "_blank";
          link.rel = "noopener noreferrer";

          // Add to DOM, click, and remove
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }

      // For other URLs, try to fetch and download
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename || "rizverse-download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);

      // For Google Drive, always fallback to direct link
      if (url.includes("drive.google.com")) {
        const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
          window.open(directDownloadUrl, "_blank");
          return;
        }
      }

      // Fallback: open in new tab if direct download fails
      window.open(url, "_blank");
    }
  };

  // Handle download function
  const handleDownload = (url: string, filename?: string) => {
    if (url.includes("drive.google.com")) {
      // For Google Drive, extract file ID and create direct download
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        // Create a temporary link element for direct download
        const link = document.createElement("a");
        link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
        link.download = filename || "rizverse-download";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback to opening in new tab
        window.open(url, "_blank");
      }
    } else {
      // For other URLs, try direct download
      downloadFile(url, filename);
    }
  };

  return {
    platforms,
    groupedByVersion,
    sortedVersions,
    latestVersion,
    latestItems,
    platformMetaByKey,
    selectedItem,
    selectedPlatformLabel,
    handleDownload,
    downloadFile,
  };
};
