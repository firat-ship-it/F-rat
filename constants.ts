import { CabinetModel, SurfaceColor } from './types';

export const MODEL_OPTIONS: CabinetModel[] = [
  CabinetModel.ALVIC_LUXE,
  CabinetModel.ALVIC_ZENIT,
  CabinetModel.ALVIC_SYNCRON,
  CabinetModel.EGEPRES,
];

export const COLOR_OPTIONS: SurfaceColor[] = [
  SurfaceColor.GLOSSY_WHITE,
  SurfaceColor.MATTE_BLACK,
  SurfaceColor.WOOD_GRAIN,
  SurfaceColor.ANTHRACITE_GRAY,
];

// For automatic price calculation
export const BASE_PRICE_PER_SQ_METER = 2500; // Base price in TL per square meter
export const MODEL_PRICE_COEFFICIENTS: Record<CabinetModel, number> = {
  [CabinetModel.ALVIC_LUXE]: 1.5,
  [CabinetModel.ALVIC_ZENIT]: 1.4,
  [CabinetModel.ALVIC_SYNCRON]: 1.2,
  [CabinetModel.EGEPRES]: 1.0,
};

// For model preview images
export const MODEL_IMAGES: Record<CabinetModel, string> = {
    [CabinetModel.ALVIC_LUXE]: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop',
    [CabinetModel.ALVIC_ZENIT]: 'https://images.unsplash.com/photo-1598262498246-9b88adaf4949?q=80&w=800&auto=format&fit=crop',
    [CabinetModel.ALVIC_SYNCRON]: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop',
    [CabinetModel.EGEPRES]: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
};

// For color swatch previews
export const COLOR_SWATCHES: Record<SurfaceColor, string> = {
    [SurfaceColor.GLOSSY_WHITE]: 'https://images.unsplash.com/photo-1588412213870-c83d6517e4f3?q=80&w=200&auto=format&fit=crop',
    [SurfaceColor.MATTE_BLACK]: 'https://images.unsplash.com/photo-1561053915-f55138d585d7?q=80&w=200&auto=format&fit=crop',
    [SurfaceColor.WOOD_GRAIN]: 'https://images.unsplash.com/photo-1568208447883-8a30138d827a?q=80&w=200&auto=format&fit=crop',
    [SurfaceColor.ANTHRACITE_GRAY]: 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?q=80&w=200&auto=format&fit=crop',
};
