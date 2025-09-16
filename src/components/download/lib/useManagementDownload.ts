import { useMemo } from "react";

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

  return {
    platforms,
    groupedByVersion,
    sortedVersions,
    latestVersion,
    latestItems,
    platformMetaByKey,
    selectedItem,
    selectedPlatformLabel,
  };
};
