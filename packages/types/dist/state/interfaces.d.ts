import { Coordinate } from 'ol/coordinate';
import { MapLayer, WmsSource } from '../map-layer/interfaces';
import { FillStyle } from '../sign/interfaces';
import { Feature } from 'ol';
import { PermissionType } from '../session/interfaces';
export declare enum ZsMapStateSource {
    OPEN_STREET_MAP = "openStreetMap",
    GEO_ADMIN_SWISS_IMAGE = "geoAdminSwissImage",
    GEO_ADMIN_PIXEL = "geoAdminPixel",
    GEO_ADMIN_PIXEL_BW = "geoAdminPixelBW",
    LOCAL = "local",
    NONE = "noBaseMap"
}
export declare const zsMapStateSourceToDownloadUrl: {
    local: string;
};
export interface IZsMapState {
    version: number;
    id: string;
    name?: string;
    layers?: ZsMapLayerState[];
    drawElements?: ZsMapDrawElementState[];
    center: Coordinate;
}
export declare const getDefaultIZsMapState: () => IZsMapState;
export interface IPositionFlag {
    coordinates: number[];
    isVisible: boolean;
}
export declare enum ZsMapDisplayMode {
    DRAW = "draw",
    HISTORY = "history"
}
export interface IZsMapDisplayState {
    id?: number;
    version: number;
    displayMode: ZsMapDisplayMode;
    expertView: boolean;
    mapOpacity: number;
    mapCenter: Coordinate;
    mapZoom: number;
    dpi?: number;
    showMyLocation: boolean;
    activeLayer: string | undefined;
    layerVisibility: Record<string, boolean>;
    layerOpacity: Record<string, number>;
    layerOrder: string[];
    source: ZsMapStateSource;
    elementOpacity: Record<string, number>;
    elementVisibility: Record<string, boolean>;
    layers: MapLayer[];
    wmsSources?: WmsSource[];
    positionFlag: IPositionFlag;
    hiddenSymbols: number[];
    hiddenFeatureTypes: string[];
    hiddenCategories: string[];
    enableClustering: boolean;
}
export declare const PaperDimensions: Record<string, [number, number]>;
export interface IZsMapPrintExtent {
    dpi: number;
    scale?: number;
    autoScaleVal?: number;
    dimensions: [number, number];
}
export interface IZsMapPrintState extends IZsMapPrintExtent {
    printView: boolean;
    format: string;
    orientation: 'landscape' | 'portrait';
    printMargin: number;
    printScale: boolean;
    emptyMap: boolean;
    qrCode: boolean;
    shareLink: boolean;
    sharePermission: PermissionType;
    printCenter?: Coordinate;
    generateCallback: (() => void) | undefined;
    tileEventCallback: ((Event: any) => void) | undefined;
    backupResolution?: number;
    backupDpi?: number;
    attributions?: string[];
}
export type ZsMapLayerState = IZsMapDrawLayerState | IZsMapGeoDataLayerState;
export declare enum ZsMapLayerStateType {
    DRAW = "draw",
    GEO_DATA = "geoData"
}
interface IZsMapBaseLayerState {
    id?: string;
    type: ZsMapLayerStateType;
    name?: string;
}
export interface IZsMapDrawLayerState extends IZsMapBaseLayerState {
    type: ZsMapLayerStateType.DRAW;
}
export interface IZsMapGeoDataLayerState extends IZsMapBaseLayerState {
    type: ZsMapLayerStateType.GEO_DATA;
}
export declare enum ZsMapDrawElementStateType {
    TEXT = "text",
    SYMBOL = "symbol",
    POLYGON = "polygon",
    LINE = "line",
    FREEHAND = "freehand"
}
export type ZsMapDrawElementState = ZsMapTextDrawElementState | ZsMapSymbolDrawElementState | ZsMapLineDrawElementState | ZsMapPolygonDrawElementState | ZsMapFreehandDrawElementState;
export interface IZsMapBaseElementState {
    id?: string;
    layer?: string;
    coordinates?: number[] | number[][];
    createdAt?: number;
}
export interface IZsMapBaseDrawElementState extends IZsMapBaseElementState {
    type: ZsMapDrawElementStateType;
    protected?: boolean;
    color?: string;
    name?: string;
    createdBy?: string;
    nameShow?: boolean;
    iconOpacity?: number;
    description?: string;
    iconSize?: number;
    rotation?: number;
    symbolId?: number;
    hideIcon?: boolean;
    iconOffset?: number;
    flipIcon?: boolean;
    style?: string;
    arrow?: string;
    strokeWidth?: number;
    fillStyle?: FillStyle;
    fillOpacity?: number;
    fontSize?: number;
    images?: string[];
    zindex?: number;
    reportNumber?: number;
    affectedPersons?: number;
}
export interface ZsMapTextDrawElementState extends IZsMapBaseDrawElementState {
    type: ZsMapDrawElementStateType.TEXT;
    text?: string;
}
export interface ZsMapSymbolDrawElementState extends IZsMapBaseDrawElementState {
    type: ZsMapDrawElementStateType.SYMBOL;
    coordinates: number[] | number[][];
}
export interface ZsMapLineDrawElementState extends IZsMapBaseDrawElementState {
    type: ZsMapDrawElementStateType.LINE;
}
export interface ZsMapPolygonDrawElementState extends IZsMapBaseDrawElementState {
    type: ZsMapDrawElementStateType.POLYGON;
}
export interface ZsMapFreehandDrawElementState extends IZsMapBaseDrawElementState {
    type: ZsMapDrawElementStateType.FREEHAND;
}
export interface ZsMapElementToDraw {
    type: ZsMapDrawElementStateType;
    layer: string;
    symbolId?: number;
    text?: string;
}
export type ZsMapDrawElementParams = IZsMapBaseDrawElementParams | IZsMapSymbolDrawElementParams | IZsMapTextDrawElementParams;
interface IZsMapBaseDrawElementParams {
    type: ZsMapDrawElementStateType;
    layer: string;
}
export interface IZsMapSymbolDrawElementParams extends IZsMapBaseDrawElementParams {
    type: ZsMapDrawElementStateType.SYMBOL;
    symbolId: number;
}
export interface IZsMapTextDrawElementParams extends IZsMapBaseDrawElementParams {
    type: ZsMapDrawElementStateType.TEXT;
    text: string;
}
export interface IZsMapSearchResult {
    label: string;
    mercatorCoordinates?: Coordinate;
    lonLat?: Coordinate;
    feature?: Feature;
    internal?: any;
}
export type SearchFunction = (searchText: string, maxResultCount?: number) => Promise<IZsMapSearchResult[]>;
export interface IZsMapSearchConfig {
    label: string;
    func: SearchFunction;
    active: boolean;
    maxResultCount: number;
    resultOrder: number;
}
export {};
