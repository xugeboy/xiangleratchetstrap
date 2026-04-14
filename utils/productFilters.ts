import { FilterOption, ProductFilter } from "@/types/productFilter";

export function formatProductFilters(
  filtersData: Record<string, Record<string, number>>
): ProductFilter[] {
  const formattedFilters: ProductFilter[] = [];

  Object.entries(filtersData).forEach(([key, values]) => {
    const options: FilterOption[] = Object.entries(values).map(
      ([optionKey, count]) => ({
        value: optionKey,
        label: optionKey,
        count,
      })
    );

    if (options.length > 0) {
      formattedFilters.push({
        id: key,
        label: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        options,
      });
    }
  });

  return formattedFilters;
}
