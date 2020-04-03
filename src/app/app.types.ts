export declare namespace Breakwater {
  interface ImageSrcSet {
    full: string,
    raw: string,
    regular: string,
    small: string,
    thumb: string
  }

  interface ImageModel {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string,
    likes: number,
    liked_by_user: boolean;
    description: string;
    urls: ImageSrcSet;
    user: any;
    links: any;
  }

  interface ImageCollection {
    body: any[];
    first?: any;
    next?: any;
    last?: any;
    prev?: any;
  }
}