export type post = {
  id: string;
  author: User;
  tags?: Tag[];
  slug: string;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  thumbnail: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updateAt: Date;
  bio: string | null;
};

export type Tag = {
  id: string;
  name: string;
};

export type commentModel = {
  post: post;
  id: string;
  author: User;
  createdAt: Date;
  content: string;
  updatedAt: Date;
};
