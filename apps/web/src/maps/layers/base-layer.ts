/**
 * OK.OS — MAP BASE LAYER
 */

export interface BaseLayerConfig {
  id: string;
  type: 'vector' | 'raster';
  url: string;
}

export const nigeriaBaseLayer: BaseLayerConfig = {
  id: 'nigeria-base',
  type: 'vector',
  url: '/api/maps/nigeria',
};
