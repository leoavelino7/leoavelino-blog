import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    locale: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
    categorySlug: {
      type: "string",
      required: true,
    },
    createdAt: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    thumbnailLarge: {
      type: "string",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
});
