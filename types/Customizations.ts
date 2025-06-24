export interface colorSelection {
  id: number;
  name: string;
  hexCode: string;
  imageId: string;
}

export interface LogoOptions {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface PackagingOptions {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Customizations {
  colorSelection: colorSelection[];
  LogoOptions: LogoOptions[];
  PackagingOptions: PackagingOptions[];
}
