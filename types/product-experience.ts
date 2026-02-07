export interface ModelState {
  exploded: number; // 0-1
  rotationY: number;
  scale: number;
  webbingProgress: number; // 0-1
  highlightParts: string[];
}

export interface PhaseProps {
  scrollProgress: number;
  isActive: boolean;
}

export interface RatchetStrapModelProps {
  exploded?: number;
  highlightParts?: string[];
  webbingProgress?: number;
  rotationY?: number;
  scale?: number;
  modelPath?: string;
}
