export interface WPImage {
    node: {
        sourceUrl: string;
    }
}

export interface Camp {
    title: string;
    slug: string;
    featuredImage: WPImage;
    excerpt?: string;

    acfFields: {
        price: string;
        difficulty: string;
        duration?: string;
        location?: string;
        startDate?: string;
    }
}

export interface Coach {
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage: WPImage;
    acfFields: {
        role: string;
        specialty: string;
        experience: string;
        athletes?: string;
    }
}

export interface Post {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    featuredImage: WPImage;
}

export interface PageData {
    title: string;
    content: string;
}
