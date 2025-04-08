// Define Filter types (assuming these are still needed)
export interface FilterOption {
    value: string;
    label: string;
    count: number;
}

export interface ProductFilter {
    id: string;
    label: string;
    options: FilterOption[];
}