import { useEffect, useRef, useState } from "react";
import plantData, { Plant } from "@/constants/plantData";
import { getJSON, setJSON } from "@/utils/storage";

const STORAGE_KEY = "@favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Plant[]>([]);
  const hydrated = useRef(false);

  // Load persisted favorite ids on mount and rehydrate full plant objects.
  useEffect(() => {
    (async () => {
      const ids = await getJSON<number[]>(STORAGE_KEY, []);
      const restored = ids
        .map((id) => plantData.find((p) => p.id === id))
        .filter((p): p is Plant => p != null);
      setFavorites(restored);
      hydrated.current = true;
    })();
  }, []);

  // Persist ids whenever favorites change — but not before hydration, or the
  // initial empty array would overwrite stored data before it loads.
  useEffect(() => {
    if (!hydrated.current) return;
    setJSON(STORAGE_KEY, favorites.map((f) => f.id));
  }, [favorites]);

  const toggleFavorite = (item: Plant) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === item.id)
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item]
    );
  };

  return { favorites, toggleFavorite };
}
