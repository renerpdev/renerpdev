export default {
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "image",
      type: "image",
      title: "Image"
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: {
        maxLength: 96
      }
    },
    {
      name: "description",
      type: "text",
      title: "Description"
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block"
        }
      ]
    }
  ]
}
